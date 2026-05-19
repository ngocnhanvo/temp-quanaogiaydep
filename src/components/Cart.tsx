import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-2xl text-primary">
                  Giỏ hàng
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 text-primary hover:text-linkcolor transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-primary/30" />
                  <p className="font-paragraph text-lg text-primary">
                    Giỏ hàng trống
                  </p>
                  <p className="font-paragraph text-base text-primary/60">
                    Thêm sản phẩm để bắt đầu mua sắm
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-primary/10 last:border-0"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-secondary">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            width={96}
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-lg text-primary mb-1">
                            {item.name}
                          </h3>
                          <p className="font-paragraph text-base text-linkcolor">
                            {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-paragraph text-base text-primary w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="p-1 border border-buttonborder text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => actions.removeFromCart(item)}
                            className="font-paragraph text-sm text-destructive hover:text-destructive/80 transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl text-primary">
                    Tổng cộng
                  </span>
                  <span className="font-heading text-2xl text-primary">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-primary text-primary-foreground font-paragraph text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Đang xử lý...' : 'Thanh toán'}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={actions.closeCart}
                  className="w-full py-4 border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
