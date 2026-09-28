import React, { useEffect, useRef, useState } from "react";
import { FiMapPin, FiX } from "react-icons/fi";
import { getDiscountedPrice } from "../Utils/price";

const fieldClassName = "mt-1 w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary";

const CheckoutModal = ({ items, total, onClose, onSubmit, initialPostalCode = "" }) => {
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: initialPostalCode,
    deliveryNotes: "",
  });
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "phone") setPhoneError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      setPhoneError("Enter a phone number with 8 to 15 digits.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    onSubmit({ ...form, paymentMethod: formData.get("paymentMethod") });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/60 p-3 sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-sm bg-white shadow-2xl sm:max-h-[94vh]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <div>
            <p className="text-sm text-gray-500">Secure checkout</p>
            <h2 id="checkout-title" className="text-xl font-semibold">Delivery details</h2>
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close checkout"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-gray-100"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-7">
            <section>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <FiMapPin className="text-primary" /> Contact and shipping address
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Full name *
                  <input
                    name="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={updateField}
                    className={fieldClassName}
                    required
                    maxLength={80}
                  />
                </label>
                <label className="text-sm font-medium">
                  Phone number *
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={updateField}
                    className={fieldClassName}
                    required
                    minLength={8}
                    maxLength={20}
                  />
                  {phoneError && <span className="mt-1 block text-xs text-red-600">{phoneError}</span>}
                </label>
                <label className="text-sm font-medium sm:col-span-2">
                  Email address *
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateField}
                    className={fieldClassName}
                    required
                    maxLength={120}
                  />
                </label>
                <label className="text-sm font-medium sm:col-span-2">
                  Street address *
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={updateField}
                    className={`${fieldClassName} min-h-20 resize-y`}
                    required
                    maxLength={240}
                  />
                </label>
                <label className="text-sm font-medium">
                  City *
                  <input
                    name="city"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={updateField}
                    className={fieldClassName}
                    required
                    maxLength={80}
                  />
                </label>
                <label className="text-sm font-medium">
                  Postal code *
                  <input
                    name="postalCode"
                    autoComplete="postal-code"
                    value={form.postalCode}
                    onChange={updateField}
                    className={fieldClassName}
                    required
                    maxLength={16}
                  />
                </label>
                <label className="text-sm font-medium sm:col-span-2">
                  Delivery notes
                  <textarea
                    name="deliveryNotes"
                    value={form.deliveryNotes}
                    onChange={updateField}
                    className={`${fieldClassName} min-h-16 resize-y`}
                    maxLength={300}
                    placeholder="Optional instructions for delivery"
                  />
                </label>
              </div>
            </section>

            <fieldset>
              <legend className="mb-3 font-semibold">Payment method</legend>
              <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-gray-300 p-4">
                <input type="radio" name="paymentMethod" value="Cash on delivery" defaultChecked />
                <span>
                  <span className="block font-medium">Cash on delivery</span>
                  <span className="text-sm text-gray-500">Pay when your order arrives.</span>
                </span>
              </label>
            </fieldset>
          </div>

          <aside className="h-fit border border-gray-200 p-4 sm:p-5">
            <h3 className="mb-4 font-semibold">Order summary</h3>
            <div className="max-h-56 space-y-4 overflow-y-auto">
              {items.map((item) => {
                const quantity = Number(item.quantity) || 1;
                return (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-sm bg-gray-100 object-contain"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium" title={item.title}>{item.title}</p>
                        <p className="text-gray-500">Qty: {quantity}</p>
                      </div>
                    </div>
                    <span className="shrink-0">${(getDiscountedPrice(item) * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>Free</span></div>
              <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                className="rounded-sm bg-primary px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-gray-300 px-5 py-3 font-medium transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
};

export default CheckoutModal;