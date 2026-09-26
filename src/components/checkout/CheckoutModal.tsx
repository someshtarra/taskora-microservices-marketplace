import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CreditCard, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Check, 
  Lock, 
  Tag, 
  Sparkles, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    checkoutItem, 
    placeOrder, 
    addToast 
  } = useApp();

  if (!isCheckoutOpen || !checkoutItem) return null;

  const { service, packageTier, addons = [] } = checkoutItem;
  const pkg = service.packages[packageTier];

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'saved' | 'invoice'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');
  const [billingName, setBillingName] = useState('Alex Mercer');

  // Price calculations
  const basePrice = pkg.price;
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const subtotal = basePrice + addonsTotal - discountAmount;
  const platformFee = Math.round(subtotal * 0.05); // 5% platform escrow & support fee
  const estimatedTax = Math.round(subtotal * 0.06); // 6% sales tax
  const grandTotal = Math.max(0, subtotal + platformFee + estimatedTax);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'TASKORA10') {
      const disc = Math.round(basePrice * 0.1);
      setDiscountAmount(disc);
      setPromoApplied(true);
      addToast('Promo Applied!', `10% discount (-$${disc}) deducted from subtotal.`, 'success');
    } else if (code === 'LAUNCH25') {
      setDiscountAmount(25);
      setPromoApplied(true);
      addToast('Promo Applied!', '$25 discount applied to your order.', 'success');
    } else {
      addToast('Invalid Coupon', 'Try "TASKORA10" or "LAUNCH25" for savings.', 'error');
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Place order in state
      placeOrder({
        serviceId: service.id,
        serviceTitle: service.title,
        serviceThumbnail: service.thumbnail,
        creator: service.creator,
        packageName: pkg.name,
        totalPrice: grandTotal,
        expectedDeliveryDate: new Date(Date.now() + pkg.deliveryDays * 86400000).toISOString().split('T')[0],
        status: 'active',
        selectedAddons: addons,
        requirementsSubmitted: false,
        progressStep: 1
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in text-left">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Secure Escrow Checkout
              </h2>
              <span className="text-[10px] text-slate-400">
                256-bit SSL encrypted • Funds released on approval
              </span>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into Payment Details & Order Summary */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* Left Column (7/12): Payment Methods & Billing Info */}
          <div className="p-6 md:col-span-7 space-y-6">
            
            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-3">
                Select Payment Method
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'wallet', label: 'Apple / Google Pay', icon: <Wallet className="w-4 h-4" /> },
                  { id: 'saved', label: 'Saved Card (•••• 4242)', icon: <Check className="w-4 h-4" /> },
                  { id: 'invoice', label: 'Corporate Invoice (Net 30)', icon: <FileText className="w-4 h-4" /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                      paymentMethod === method.id
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {method.icon}
                    <span className="truncate">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <div className="absolute right-3 top-2.5 text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">
                      VISA
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <Wallet className="w-10 h-10 text-indigo-500 mx-auto" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Fast 1-Click Biometric Checkout
                </h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Authenticate securely using FaceID or TouchID linked to Apple Pay / Google Pay.
                </p>
              </div>
            )}

            {paymentMethod === 'invoice' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Enterprise Net-30 Invoicing
                </div>
                <p className="text-slate-500 text-[11px]">
                  An official PDF invoice with VAT/tax breakdown will be emailed to your accounting department. Payment due in 30 days.
                </p>
              </div>
            )}

            {/* Escrow Guarantee Disclaimer */}
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <span className="font-bold">Taskora Milestone Escrow Protection:</span>
                <p className="text-[11px] mt-0.5 text-emerald-700 dark:text-emerald-400">
                  Your payment is securely vaulted. The specialist only receives payouts after you inspect and approve the completed deliverables.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (5/12): Order Summary Breakdown */}
          <div className="p-6 md:col-span-5 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Order Summary
              </h3>

              {/* Service Capsule */}
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <img
                  src={service.thumbnail}
                  alt={service.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    {pkg.name} Package
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                    {service.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{pkg.deliveryDays} days turnaround</span>
                  </div>
                </div>
              </div>

              {/* Addons List */}
              {addons.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-500">Selected Add-ons:</div>
                  {addons.map((a) => (
                    <div key={a.id} className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span>+ {a.name}</span>
                      <span className="font-semibold">${a.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (e.g. TASKORA10)"
                    disabled={promoApplied}
                    className="flex-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs uppercase font-medium focus:outline-none"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                    ✓ Promo code applied successfully
                  </span>
                )}
              </div>

              {/* Detailed Cost Breakdown Table */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Package Base Price</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${basePrice}</span>
                </div>

                {addonsTotal > 0 && (
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Add-ons Total</span>
                    <span className="font-semibold text-slate-900 dark:text-white">${addonsTotal}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promotional Discount</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Taskora Escrow & Platform Fee (5%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${platformFee}</span>
                </div>

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Estimated Tax (6%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${estimatedTax}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
                  <span>Total Due</span>
                  <span className="text-xl text-indigo-600 dark:text-indigo-400">
                    ${grandTotal}
                  </span>
                </div>
              </div>

            </div>

            {/* Complete Purchase Button */}
            <div>
              <button
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Escrow Vault...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay ${grandTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-2">
                By purchasing, you agree to Taskora Terms of Service and Escrow Rules.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
