from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uvicorn
import re
import math

app = FastAPI(
    title="Taskora AI & Semantic Search Microservice",
    description="Python FastAPI service handling natural language queries, semantic matching, and AI agent assistant.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory catalogue for vector indexing simulation
SERVICES_CATALOG = [
    {
        "id": "srv-1",
        "title": "Custom AI Customer Support Chatbot for Shopify & SaaS with Vector Search",
        "category": "AI & Automation",
        "starting_price": 149,
        "tags": ["AI Chatbot", "Shopify", "OpenAI", "Zendesk", "RAG Pipeline"],
        "keywords": ["ai", "chatbot", "shopify", "rag", "support", "customer", "vector"]
    },
    {
        "id": "srv-2",
        "title": "High-Converting SaaS Landing Page UI/UX Design System in Figma",
        "category": "Design",
        "starting_price": 199,
        "tags": ["Figma", "UI/UX", "Landing Page", "Design System"],
        "keywords": ["figma", "design", "ui", "ux", "landing", "saas"]
    },
    {
        "id": "srv-3",
        "title": "Kubernetes Cluster Audit, Zero-Downtime Migration & Terraform IaC",
        "category": "Cloud",
        "starting_price": 249,
        "tags": ["Kubernetes", "AWS EKS", "Terraform", "DevOps"],
        "keywords": ["kubernetes", "k8s", "cloud", "aws", "terraform", "devops"]
    },
    {
        "id": "srv-4",
        "title": "Full Business Automation with Make.com, Airtable & AI Assistants",
        "category": "Business",
        "starting_price": 119,
        "tags": ["Make.com", "Airtable", "Automation", "CRM"],
        "keywords": ["make", "automation", "airtable", "crm", "workflow"]
    },
    {
        "id": "srv-7",
        "title": "SOC2 & ISO27001 Cloud Cybersecurity Penetration Testing & Audit",
        "category": "Cybersecurity",
        "starting_price": 320,
        "tags": ["Cybersecurity", "Penetration Testing", "SOC2", "OWASP"],
        "keywords": ["security", "cybersecurity", "soc2", "audit", "pen test", "penetration"]
    }
]

class SearchRequest(BaseModel):
    query: str = Field(..., example="Need an AI chatbot for a Shopify store under $300")
    category: Optional[str] = "All"
    max_price: Optional[float] = 1500.0

class SearchResultItem(BaseModel):
    id: str
    title: str
    category: str
    starting_price: float
    relevance_score: float
    matched_tags: List[str]

class SearchResponse(BaseModel):
    detected_category: str
    detected_max_budget: Optional[float]
    cleaned_query: str
    matches: List[SearchResultItem]

class ChatRequest(BaseModel):
    prompt: str
    conversation_id: Optional[str] = "default"

class ChatResponse(BaseModel):
    reply: str
    recommended_service_id: Optional[str] = None
    suggested_actions: List[str]

# --- Kubernetes Probes Endpoints ---
@app.get("/healthz", tags=["Kubernetes Probes"])
def liveness_probe():
    """Liveness probe: verifies the Python process event loop is active."""
    return {"status": "healthy", "service": "ai-search-service", "runtime": "python-3.14"}

@app.get("/readyz", tags=["Kubernetes Probes"])
def readiness_probe():
    """Readiness probe: verifies embeddings index is loaded and ready for traffic."""
    return {"status": "ready", "indexed_documents": len(SERVICES_CATALOG)}

# --- Core Business APIs ---
@app.post("/api/v1/ai/search", response_model=SearchResponse, tags=["Semantic Search"])
def semantic_search(payload: SearchRequest):
    raw_query = payload.query.lower()
    
    # 1. Natural Language Price Extractor (Regex)
    price_match = re.search(r"under\s*\$?(\d+)|less than\s*\$?(\d+)|\<\s*\$?(\d+)", raw_query)
    detected_budget = float(price_match.group(1) or price_match.group(2) or price_match.group(3)) if price_match else payload.max_price
    
    # 2. Intent Categorization
    detected_category = payload.category or "All"
    if "ai" in raw_query or "chatbot" in raw_query or "bot" in raw_query or "llm" in raw_query:
        detected_category = "AI & Automation"
    elif "cloud" in raw_query or "kubernetes" in raw_query or "k8s" in raw_query or "aws" in raw_query:
        detected_category = "Cloud"
    elif "figma" in raw_query or "design" in raw_query or "landing" in raw_query:
        detected_category = "Design"
    elif "security" in raw_query or "pen test" in raw_query or "soc2" in raw_query:
        detected_category = "Cybersecurity"

    # 3. Clean Search Tokens
    cleaned = re.sub(r"need an?|for a|under\s*\$?\d+|less than\s*\$?\d+", "", raw_query).strip()
    query_tokens = set(cleaned.split())

    matches = []
    for item in SERVICES_CATALOG:
        # Category filter
        if detected_category != "All" and item["category"] != detected_category:
            continue
        # Price constraint
        if detected_budget and item["starting_price"] > detected_budget:
            continue
        
        # Simulated TF-IDF / Cosine overlap score
        item_words = set(item["keywords"])
        overlap = len(query_tokens.intersection(item_words))
        score = 0.5 + (overlap * 0.25)
        score = min(0.99, max(0.40, score))

        matches.append(SearchResultItem(
            id=item["id"],
            title=item["title"],
            category=item["category"],
            starting_price=item["starting_price"],
            relevance_score=round(score, 2),
            matched_tags=item["tags"]
        ))

    matches.sort(key=lambda x: x.relevance_score, reverse=True)

    return SearchResponse(
        detected_category=detected_category,
        detected_max_budget=detected_budget,
        cleaned_query=cleaned,
        matches=matches
    )

@app.post("/api/v1/ai/chat", response_model=ChatResponse, tags=["AI Assistant"])
def ai_assistant(req: ChatRequest):
    prompt_lower = req.prompt.lower()
    
    if "shopify" in prompt_lower or "chatbot" in prompt_lower:
        return ChatResponse(
            reply="I recommend Elena Rostova's Custom AI Customer Support Chatbot. It connects Shopify and Zendesk APIs with automated order tracking and returns.",
            recommended_service_id="srv-1",
            suggested_actions=["View Package Pricing", "Book 30-min Consultation", "Request Custom Quote"]
        )
    elif "kubernetes" in prompt_lower or "cloud" in prompt_lower:
        return ChatResponse(
            reply="Siddharth Rao offers an audited Kubernetes migration package that reduces AWS/GCP cloud spend by ~30% with zero downtime.",
            recommended_service_id="srv-3",
            suggested_actions=["Review Architecture Guide", "Book Cluster Audit"]
        )
    else:
        return ChatResponse(
            reply=f"Taskora AI found multiple verified specialists for '{req.prompt}'. Post a custom project to receive transparent match factor scores.",
            suggested_actions=["Post a Project", "Browse Marketplace"]
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
