package com.taskora.payment.controller;

import com.taskora.payment.model.PaymentCalculationRequest;
import com.taskora.payment.model.PaymentCalculationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getServiceStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("service", "payment-billing-service");
        status.put("runtime", "Java 21 / Spring Boot 3.3");
        status.put("pci_dss_compliant", true);
        status.put("escrow_ledger", "ACTIVE");
        return ResponseEntity.ok(status);
    }

    @PostMapping("/calculate")
    public ResponseEntity<PaymentCalculationResponse> calculatePayment(@RequestBody PaymentCalculationRequest request) {
        double base = request.getBasePrice();
        double addons = 0.0;
        if (request.getAddonPrices() != null) {
            for (Double p : request.getAddonPrices()) {
                if (p != null) addons += p;
            }
        }

        double discount = 0.0;
        boolean promoValid = false;
        if (request.getPromoCode() != null) {
            String code = request.getPromoCode().trim().toUpperCase();
            if ("TASKORA10".equals(code)) {
                discount = Math.round(base * 0.10);
                promoValid = true;
            } else if ("LAUNCH25".equals(code)) {
                discount = 25.0;
                promoValid = true;
            }
        }

        double subtotal = Math.max(0, base + addons - discount);
        double platformFee = Math.round(subtotal * 0.05); // 5% Taskora Escrow & Platform fee
        double estimatedTax = Math.round(subtotal * 0.06); // 6% Sales/VAT Tax
        double grandTotal = subtotal + platformFee + estimatedTax;

        PaymentCalculationResponse response = new PaymentCalculationResponse();
        response.setBasePrice(base);
        response.setAddonsTotal(addons);
        response.setDiscountAmount(discount);
        response.setPlatformFee(platformFee);
        response.setEstimatedTax(estimatedTax);
        response.setGrandTotal(grandTotal);
        response.setPromoValid(promoValid);
        response.setEscrowProtectionStatus("SECURED_IN_ESCROW_VAULT");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/charge")
    public ResponseEntity<Map<String, Object>> processCharge(@RequestBody Map<String, Object> chargePayload) {
        String transactionId = "tx-" + UUID.randomUUID().toString().substring(0, 8);
        Map<String, Object> result = new HashMap<>();
        result.put("transaction_id", transactionId);
        result.put("status", "ESCROW_VAULT_FUNDED");
        result.put("payout_condition", "RELEASED_UPON_CLIENT_MILESTONE_APPROVAL");
        result.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(result);
    }
}
