import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getCurrentAccount, signOutLocalAccount, updateLocalAccount } from "../Utils/localAccount";

const fieldClass = "h-11 w-full rounded-sm bg-[#F5F5F5] px-4 text-sm text-black outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-primary";
const labelClass = "mb-2 block text-sm text-black";

const MyAccount = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(getCurrentAccount);
  const [activeSection, setActiveSection] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => ({
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    emailOrPhone: account?.emailOrPhone || "",
    address: account?.address || "",
  }));

  if (!account) return <Navigate to="/login" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      firstName: account.firstName || "",
      lastName: account.lastName || "",
      emailOrPhone: account.emailOrPhone || "",
      address: account.address || "",
    });
    document.querySelector("[name='currentPassword']")?.form?.reset();
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    try {
      const updated = await updateLocalAccount({
        ...form,
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      });
      setAccount(updated);
      formElement.reset();
      toast.success("Your profile has been updated.");
    } catch (error) {
      toast.error(error.message || "Unable to save your changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    signOutLocalAccount();
    toast.info("You have been logged out.");
    navigate("/login", { replace: true });
  };

  const navButton = (label, section, className = "") => (
    <button
      type="button"
      onClick={() => setActiveSection(section)}
      className={`block py-1 text-left text-sm transition-colors ${activeSection === section ? "text-primary" : "text-gray-500 hover:text-black"} ${className}`}
    >
      {label}
    </button>
  );

  return (
    <main className="bg-white px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">
            <Link to="/" className="hover:text-black">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-black">My Account</span>
          </p>
          <p>
            <span className="text-gray-600">Welcome! </span>
            <span className="text-primary">{account.firstName} {account.lastName}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[190px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <aside aria-label="Account navigation" className="flex flex-col gap-6 border-b border-gray-200 pb-5 md:border-0 md:pb-0">
            <div>
              <h2 className="mb-3 text-base font-medium">Manage My Account</h2>
              <div className="space-y-1 pl-5">
                {navButton("My Profile", "profile")}
                {navButton("Address Book", "address")}
                {navButton("My Payment Options", "payments")}
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-base font-medium">My Orders</h2>
              <div className="space-y-1 pl-5">
                {navButton("My Returns", "returns")}
                {navButton("My Cancellations", "cancellations")}
              </div>
            </div>
            <div>
              <Link to="/wishlist" className="text-base font-medium hover:text-primary">My WishList</Link>
            </div>
            <button type="button" onClick={handleSignOut} className="mt-1 self-start text-sm text-gray-500 hover:text-primary">
              Log Out
            </button>
          </aside>

          <section className="min-w-0 rounded-sm bg-white p-5 shadow-[0_1px_12px_rgba(0,0,0,0.06)] sm:p-8 lg:p-11">
            {activeSection === "profile" || activeSection === "address" ? (
              <>
                <h1 className="mb-5 text-lg font-medium text-primary">
                  {activeSection === "profile" ? "Edit Your Profile" : "Address Book"}
                </h1>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      First Name
                      <input name="firstName" value={form.firstName} onChange={handleChange} autoComplete="given-name" required className={`${fieldClass} mt-2`} />
                    </label>
                    <label className={labelClass}>
                      Last Name
                      <input name="lastName" value={form.lastName} onChange={handleChange} autoComplete="family-name" className={`${fieldClass} mt-2`} />
                    </label>
                    <label className={labelClass}>
                      Email or Phone Number
                      <input name="emailOrPhone" type="text" value={form.emailOrPhone} onChange={handleChange} autoComplete="email" required className={`${fieldClass} mt-2`} />
                    </label>
                    <label className={labelClass}>
                      Address
                      <input name="address" value={form.address} onChange={handleChange} autoComplete="street-address" className={`${fieldClass} mt-2`} />
                    </label>
                  </div>

                  {activeSection === "profile" && (
                    <fieldset className="space-y-4">
                      <legend className="mb-1 text-sm text-black">Password Changes</legend>
                      <input type="password" name="currentPassword" autoComplete="current-password" placeholder="Current Password" aria-label="Current Password" className={fieldClass} />
                      <input type="password" name="newPassword" autoComplete="new-password" placeholder="New Password" aria-label="New Password" minLength={8} className={fieldClass} />
                      <input type="password" name="confirmPassword" autoComplete="new-password" placeholder="Confirm New Password" aria-label="Confirm New Password" minLength={8} className={fieldClass} />
                    </fieldset>
                  )}

                  <div className="flex items-center justify-end gap-5 pt-1">
                    <button type="button" onClick={handleCancel} className="text-sm text-black hover:underline">Cancel</button>
                    <button type="submit" disabled={saving} className="min-h-12 min-w-36 rounded-sm bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-wait disabled:opacity-70">
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-10">
                <h1 className="text-lg font-medium text-primary">
                  {activeSection === "payments" ? "My Payment Options" : activeSection === "returns" ? "My Returns" : "My Cancellations"}
                </h1>
                <p className="mt-4 text-sm text-gray-500">
                  {activeSection === "payments" ? "No saved payment methods." : "There are no orders to show yet."}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default MyAccount;