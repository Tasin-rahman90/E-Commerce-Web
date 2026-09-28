import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import createAccountImage from "../assets/createAccount.png";
import { loginLocalAccount, registerLocalAccount } from "../Utils/localAccount";

const SignUp = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = pathname === "/login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accountDetails = {
      identifier: formData.get("emailOrPhone"),
      password: formData.get("password"),
    };

    try {
      const account = isLogin
        ? await loginLocalAccount(accountDetails)
        : await registerLocalAccount({ ...accountDetails, name: formData.get("name") });
      toast.success(`Welcome${account.firstName ? `, ${account.firstName}` : ""}!`);
      navigate("/account", { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to access your account. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    toast.info("Google sign-in is not configured yet.");
  };

  return (
    <main className="mx-auto grid min-h-122.5 w-full grid-cols-1 items-center gap-10 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-12 min-[1306px]:grid-cols-[805px_371px] min-[1306px]:gap-32.5 min-[1306px]:py-12">
      <img
        src={createAccountImage}
        alt="Shopping cart, phone, and shopping bags"
        className="w-full rounded-r-sm object-cover md:aspect-square min-[1306px]:h-195.25 min-[1306px]:w-201.25"
      />

      <section className="mx-auto w-full max-w-92.75 px-6 py-4 md:px-8 min-[1306px]:mx-0">
        <h1 className="font-inter text-3xl font-medium tracking-wide text-black">
          {isLogin ? "Log in to Exclusive" : "Create an account"}
        </h1>
        <p className="mt-3 text-sm text-black">Enter your details below</p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-6">
          {!isLogin && (
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Name"
              aria-label="Name"
              required
              className="w-full border-b border-gray-300 bg-transparent pb-2 text-sm outline-none placeholder:text-gray-400 focus:border-black"
            />
          )}
          <input
            type="text"
            name="emailOrPhone"
            autoComplete={isLogin ? "username" : "email"}
            placeholder="Email or Phone Number"
            aria-label="Email or Phone Number"
            required
            className="w-full border-b border-gray-300 bg-transparent pb-2 text-sm outline-none placeholder:text-gray-400 focus:border-black"
          />
          <input
            type="password"
            name="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
            className="w-full border-b border-gray-300 bg-transparent pb-2 text-sm outline-none placeholder:text-gray-400 focus:border-black"
          />

          <button
            type="submit"
            className="mt-1 min-h-12 w-full rounded-sm bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isLogin ? "Log In" : "Create Account"}
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-gray-400 px-4 text-sm text-black transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            <FcGoogle aria-hidden="true" className="text-xl" />
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="ml-1 border-b border-gray-500 pb-0.5 text-black hover:border-black"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;