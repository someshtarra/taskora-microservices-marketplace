package com.taskora.payment.model;

import java.util.List;

public class PaymentCalculationRequest {
    private double basePrice;
    private List<Double> addonPrices;
    private String promoCode;
    private String paymentMethod; // "card", "wallet", "invoice", "saved"

    public PaymentCalculationRequest() {}

    public double getBasePrice() { return basePrice; }
    public void setBasePrice(double basePrice) { this.basePrice = basePrice; }

    public List<Double> getAddonPrices() { return addonPrices; }
    public void setAddonPrices(List<Double> addonPrices) { this.addonPrices = addonPrices; }

    public String getPromoCode() { return promoCode; }
    public void setPromoCode(String promoCode) { this.promoCode = promoCode; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
