package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Milestone represents an escrow milestone
type Milestone struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	Amount      float64 `json:"amount"`
	DueDate     string  `json:"due_date"`
	Status      string  `json:"status"` // "funded", "in_progress", "submitted", "released"
	ReleasedAt  string  `json:"released_at,omitempty"`
}

// Order represents an escrow-backed microservice purchase
type Order struct {
	ID                   string      `json:"id"`
	ServiceID            string      `json:"service_id"`
	ServiceTitle         string      `json:"service_title"`
	ClientName           string      `json:"client_name"`
	SpecialistID         string      `json:"specialist_id"`
	SpecialistName       string      `json:"specialist_name"`
	PackageTier          string      `json:"package_tier"`
	TotalAmount          float64     `json:"total_amount"`
	EscrowVaultedAmount  float64     `json:"escrow_vaulted_amount"`
	EscrowReleasedAmount float64     `json:"escrow_released_amount"`
	Status               string      `json:"status"` // "active", "under_review", "completed"
	OrderedAt            string      `json:"ordered_at"`
	Milestones           []Milestone `json:"milestones"`
}

type OrderStore struct {
	sync.RWMutex
	orders map[string]*Order
}

var store = OrderStore{
	orders: make(map[string]*Order),
}

func init() {
	// Seed realistic demo order
	initialOrder := &Order{
		ID:                   "ord-8921",
		ServiceID:            "srv-1",
		ServiceTitle:         "Custom AI Customer Support Chatbot for Shopify & SaaS",
		ClientName:           "Alex Mercer",
		SpecialistID:         "c1",
		SpecialistName:       "Elena Rostova",
		PackageTier:          "Standard",
		TotalAmount:          364.0,
		EscrowVaultedAmount:  364.0,
		EscrowReleasedAmount: 0.0,
		Status:               "active",
		OrderedAt:            time.Now().Format("2006-01-02"),
		Milestones: []Milestone{
			{
				ID:      "m-1",
				Title:   "Knowledge Base Vector Indexing & Prompt Chaining",
				Amount:  180.0,
				DueDate: "2026-09-28",
				Status:  "in_progress",
			},
			{
				ID:      "m-2",
				Title:   "Shopify Webhook Sync & Staging Testing",
				Amount:  184.0,
				DueDate: "2026-10-04",
				Status:  "funded",
			},
		},
	}
	store.orders[initialOrder.ID] = initialOrder
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

func livenessHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "healthy",
		"service": "order-escrow-service",
		"runtime": "go-1.22",
		"time":    time.Now().UTC(),
	})
}

func readinessHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	store.RLock()
	ordersCount := len(store.orders)
	store.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":       "ready",
		"active_orders": ordersCount,
	})
}

func ordersHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case "GET":
		store.RLock()
		defer store.RUnlock()
		orderList := make([]*Order, 0, len(store.orders))
		for _, o := range store.orders {
			orderList = append(orderList, o)
		}
		json.NewEncoder(w).Encode(orderList)

	case "POST":
		var newOrder Order
		if err := json.NewDecoder(r.Body).Decode(&newOrder); err != nil {
			http.Error(w, `{"error":"Invalid payload"}`, http.StatusBadRequest)
			return
		}

		if newOrder.ID == "" {
			newOrder.ID = fmt.Sprintf("ord-%d", time.Now().Unix()%10000)
		}
		newOrder.OrderedAt = time.Now().Format("2006-01-02")
		newOrder.EscrowVaultedAmount = newOrder.TotalAmount
		newOrder.EscrowReleasedAmount = 0
		newOrder.Status = "active"

		store.Lock()
		store.orders[newOrder.ID] = &newOrder
		store.Unlock()

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(newOrder)

	default:
		http.Error(w, `{"error":"Method not allowed"}`, http.StatusMethodNotAllowed)
	}
}

// Handler for releasing milestone escrow: /api/v1/orders/{id}/release
func releaseMilestoneHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, `{"error":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	parts := strings.Split(r.URL.Path, "/")
	if len(parts) < 5 {
		http.Error(w, `{"error":"Invalid path format"}`, http.StatusBadRequest)
		return
	}
	orderID := parts[4]

	var req struct {
		MilestoneID string `json:"milestone_id"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	store.Lock()
	defer store.Unlock()

	order, exists := store.orders[orderID]
	if !exists {
		http.Error(w, `{"error":"Order not found"}`, http.StatusNotFound)
		return
	}

	var releasedAmount float64
	for i := range order.Milestones {
		if order.Milestones[i].ID == req.MilestoneID || req.MilestoneID == "" {
			if order.Milestones[i].Status != "released" {
				order.Milestones[i].Status = "released"
				order.Milestones[i].ReleasedAt = time.Now().Format(time.RFC3339)
				releasedAmount += order.Milestones[i].Amount
			}
		}
	}

	order.EscrowVaultedAmount -= releasedAmount
	order.EscrowReleasedAmount += releasedAmount
	if order.EscrowVaultedAmount <= 0 {
		order.Status = "completed"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":               true,
		"order_id":              order.ID,
		"released_amount":       releasedAmount,
		"remaining_in_escrow":   order.EscrowVaultedAmount,
		"status":                order.Status,
		"message":               "Escrow funds successfully released to specialist balance",
	})
}

func main() {
	mux := http.NewServeMux()

	// Kubernetes Probes
	mux.HandleFunc("/healthz", livenessHandler)
	mux.HandleFunc("/readyz", readinessHandler)

	// API Endpoints
	mux.HandleFunc("/api/v1/orders", ordersHandler)
	mux.HandleFunc("/api/v1/orders/", releaseMilestoneHandler)

	port := ":8002"
	log.Printf("[Taskora] Go Order & Escrow Microservice listening on port %s...\n", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
