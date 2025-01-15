import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import validator from "validator";
import { useState } from "react";

function PasswordForm({ setPasswords, hideForm }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setPasswords((prevPasswords) => [...prevPasswords, data]);
    reset(); // Clear the form
    hideForm(); // Hide the form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-amber-50 p-6 rounded-xl shadow-md"
    >
      {/* Fields for Website, Username, and Password */}
      <div>
        <label
          htmlFor="website"
          className="block text-md font-bold text-gray-700"
        >
          Website
        </label>
        <input
          id="website"
          type="text"
          placeholder="Enter a website link"
          {...register("website", { required: "Website is required" })}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 border-blue-400"
        />
        {errors.website && (
          <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-md font-bold text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter a username"
          {...register("username", { required: "Username is required" })}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 border-blue-400"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="password"
          className="block text-md font-bold text-gray-700 "
        >
          Password
        </label>
        <input
          id="password"
          placeholder="Enter a password"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full px-4 py-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 border-blue-400"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="w-36 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save Password
        </button>
      </div>
    </form>
  );
}

export default PasswordForm;
