import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SalesPersonLogin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt with:", formData);
      setFormData({
        email: "",
        password: "",
      });
      // Add your authentication logic here
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100dvh-20dvh)] lg:h-[calc(100dvh-23dvh)] max-h-[700px] sm:px-4 ">
      <div className=" rounded-sm pb-4 md:pb-8 w-full max-w-xl bg-white transition-all duration-300 hover:shadow-sm">
        {/* Header */}
        <div className="border-b sm py-4 ">
          <h3 className="text-custom-black text-2xl font-bold text-center">Login</h3>
          <p className="text-gray-600 text-sm text-center mt-1">Access your dashboard</p>
        </div>
        {/* Form */}
        <div className="px-3 sm:px-4 md:px-8 py-5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 dark:text-white transition-colors"
              >
                Work Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300/50 text-gray-900 text-sm rounded-lg  block w-full p-3 pr-10 transition-all duration-200 "
                placeholder="name@company.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 dark:text-white transition-colors"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 focus:outline-none focus:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300/50 text-gray-900 text-sm rounded-lg  block w-full p-3 pr-10 transition-all duration-200 "
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 focus:outline-none"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {isPasswordVisible ? (
                    <IoEyeOutline className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <IoEyeOffOutline className="h-5 w-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full text-white green-background rounded-lg font-semibold text-sm px-5 py-3.5 text-center flex justify-center items-center space-x-3 transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <FaSignInAlt className="text-base" />
                  <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">Secure login with enterprise-grade encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPersonLogin;
