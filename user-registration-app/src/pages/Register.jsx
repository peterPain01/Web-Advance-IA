// src/pages/Register.js
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios({
                method: "post",
                url: "https://user-registration-api-jade.vercel.app/api/user/register",
                data: data,                                                                                                                                                           
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            alert(response.data.message || "Registration successful");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <form>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-gray-800 text-xl mb-6">
                                Register Form
                            </h1>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Email Id
                            </label>
                            <input
                                name="email"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Confirm Password
                            </label>
                            <input
                                name="cpassword"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter confirm password"
                            />
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button
                            type="button"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Create an account
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <a
                            href="javascript:void(0);"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                        >
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
