import React, { useState } from "react";
import Container from "../Components/Container";
import BreadCrump from "../Components/BreadCrump";
import CartItem from "../Components/CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router";
import { FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { ClearCartReducer } from "../Slices/ProductSlice";
import CheckoutModal from "../Components/CheckoutModal";
import { getDiscountedPrice } from "../Utils/price";
const Cart = () => {

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector(state => state.products.cart)
  const cartTotal = data.reduce(
    (total, item) => total + getDiscountedPrice(item) * (Number(item.quantity) || 1),
    0
  )

  const openCheckout = () => {
    if (data.length === 0) {
      toast.error("Your cart is empty. Add products before checkout.");
      return;
    }
    setCheckoutOpen(true);
  }

  const confirmOrder = (customerDetails) => {
    dispatch(ClearCartReducer());
    setCheckoutOpen(false);
    toast.success(`Order confirmed for ${customerDetails.fullName}!`);
  }

  const cancelCheckout = () => {
    setCheckoutOpen(false);
    toast.info("Checkout cancelled. Your cart is unchanged.");
  }

  return (
    <>
      <div className="pt-20 pb-35">
        <Container>
          <BreadCrump />

          <div className="pt-20">
            {data.length > 0 ? (
              <>
                <div className="hidden grid-cols-4 items-center rounded-sm py-6 px-10 shadow-sm md:grid">
                  <h4>Product</h4>
                  <h4>Price</h4>
                  <h4>Quantity</h4>
                  <h4>Subtotal</h4>
                </div>
                {data.map((item) => (
                  <CartItem
                    key={item.id}
                    product={item}
                  />
                ))}
                <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
                  <div className="flex flex-col items-end gap-5">
                    <div className="flex gap-8 text-lg font-semibold">
                      <span>Cart Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={openCheckout}
                      className="rounded-sm bg-primary px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-sm border border-gray-200 px-6 py-14 text-center">
                <FiShoppingBag className="mb-5 text-5xl text-primary" aria-hidden="true" />
                <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
                <p className="mb-6 text-gray-500">You have not added anything yet.</p>
                <Link
                  to="/"
                  className="rounded-sm bg-primary px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
      {checkoutOpen && (
        <CheckoutModal
          items={data}
          total={cartTotal}
          onClose={cancelCheckout}
          onSubmit={confirmOrder}
        />
      )}
    </>
  );
};

export default Cart;