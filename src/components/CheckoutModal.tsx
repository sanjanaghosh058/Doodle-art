"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Banknote,
  Heart,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/hooks/useCart";
import toast from "react-hot-toast";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

type PaymentMethod = "card" | "cash" | "complements";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
}: CheckoutModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    complement: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      icon: CreditCard,
      title: "Card Payment",
      description: "Pay securely with your credit/debit card",
    },
    {
      id: "cash" as PaymentMethod,
      icon: Banknote,
      title: "Cash Payment",
      description: "Pay with cash on delivery",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsSuccess(true);

    if (selectedPayment === "complements") {
      toast.success("Thank you for your kind words! 💖");
    } else {
      toast.success("Payment successful! 🎉");
    }

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedPayment === "complements"
                  ? "Thank You!"
                  : "Payment Successful!"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedPayment === "complements"
                  ? "Your kind words mean the world to us!"
                  : "Your order has been confirmed and will be processed soon."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Checkout
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-6 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-pink-600 dark:text-pink-400">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="lg:w-1/2 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <motion.label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            selectedPayment === method.id
                              ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) =>
                              setSelectedPayment(
                                e.target.value as PaymentMethod
                              )
                            }
                            className="sr-only"
                          />
                          <method.icon className="w-6 h-6 text-pink-500 mr-3" />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {method.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {method.description}
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />

                  {/* Payment Details */}
                  {selectedPayment === "card" && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number *"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY *"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV *"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPayment === "complements" && (
                    <textarea
                      name="complement"
                      placeholder="Share your kind words with us... *"
                      value={formData.complement}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    />
                  )}

                  {/* Security Notice */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Lock className="w-4 h-4" />
                    <span>Your information is secure and encrypted</span>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 pink-gradient text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {selectedPayment === "complements"
                            ? "Send Complements"
                            : selectedPayment === "cash"
                            ? "Place Order"
                            : "Pay Now"}
                        </span>
                        {selectedPayment !== "complements" && (
                          <span>₹{totalPrice.toLocaleString()}</span>
                        )}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
