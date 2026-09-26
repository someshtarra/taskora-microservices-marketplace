package com.taskora.payment.model;

public class PaymentCalculationResponse {
    private double basePrice;
    private double addonsTotal;
    private double discountAmount;
    private double platformFee;
    private double estimatedTax;
    private double grandTotal;
    private boolean promoValid;
    private String escrowProtectionStatus;

    public PaymentCalculationResponse() {}

    public double getBasePrice() { return basePrice; }
    public void setBasePrice(double basePrice) { this.basePrice = basePrice; }

    public double getAddonsTotal() { return addonsTotal; }
    public void setAddonsTotal(double addonsTotal) { this.addonsTotal = addonsTotal; }

    public double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(double discountAmount) { this.discountAmount = discountAmount; }

    public double getPlatformFee() { return platformFee; }
    public void setPlatformFee(double platformFee) { this.platformFee = platformFee; }

    public double getEstimatedTax() { return estimatedTax; }
    public void setEstimatedTax(double estimatedTax) { this.estimatedTax = estimatedTax; }

    public double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(double grandTotal) { this.grandTotal = grandTotal; }

    public boolean isPromoValid() { return promoValid; }
    public void setPromoValid(boolean promoValid) { this.promoValid = promoValid; }

    public String getEscrowProtectionStatus() { return escrowProtectionStatus; }
    public void setEscrowProtectionStatus(String escrowProtectionStatus) { this.escrowProtectionStatus = escrowProtectionStatus; }
}
