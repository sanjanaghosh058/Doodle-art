"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { CartItem } from "@/hooks/useCart";
import toast from "react-hot-toast";
import Image from "next/image";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

type PaymentMethod = "qr";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
}: CheckoutModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("qr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentMethods = [
    {
      id: "qr" as PaymentMethod,
      icon: QrCode,
      title: "QR Code Payment",
      description: "Scan QR code to pay via UPI",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    toast.success("Payment successful! 🎉");
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
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Your order has been confirmed and will be processed soon.
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-2 sm:px-4 py-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                Checkout
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row overflow-y-auto">
              {/* Order Summary */}
              <div className="w-full lg:w-1/2 p-3 sm:p-6 bg-gray-50 dark:bg-gray-800 order-2 lg:order-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6 max-h-56 sm:max-h-72 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {item.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base ml-2">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center justify-between text-sm sm:text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-pink-600 dark:text-pink-400">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="w-full lg:w-1/2 p-3 sm:p-6 order-1 lg:order-2">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Payment Method */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Payment Method
                    </h3>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <motion.label
                          key={method.id}
                          className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition ${
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
                          <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mr-3" />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                              {method.title}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {method.description}
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {["name", "email"].map((field) => (
                      <input
                        key={field}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={
                          field === "name" ? "Full Name *" : "Email *"
                        }
                        value={formData[field as keyof typeof formData]}
                        onChange={handleInputChange}
                        required
                        className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                      />
                    ))}
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                  />

                  {/* QR Code Payment */}
                  {selectedPayment === "qr" && (
                    <div className="text-center space-y-4 sm:space-y-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        Scan QR Code to Pay
                      </h3>
                      <div className="bg-white p-3 sm:p-4 rounded-xl inline-block shadow">
                        <Image
                          src="/payment/QR.jpg"
                          alt="Payment QR Code"
                          width={180}
                          height={180}
                          className="rounded-lg w-[140px] sm:w-[200px] h-auto"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                        Scan this QR code with any UPI app to complete your
                        payment of ₹{totalPrice.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Your information is secure and encrypted</span>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold text-sm sm:text-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay Now</span>
                        <span className="hidden sm:inline">
                          ₹{totalPrice.toLocaleString()}
                        </span>
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
