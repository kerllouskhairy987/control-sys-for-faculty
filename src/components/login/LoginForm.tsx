"use client";

import { useActionState, useEffect, useState } from "react";
import InputMessageError from "../ui/InputMessageError";
import Loader from "../ui/Loader";
import { loginAction, loginStates } from "@/server/LoginAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { verifyToken } from "@/utils/verifyToken";

interface IProps {
    token: string;
}

const LoginForm = ({ token }: IProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialState: loginStates = {
        success: false,
        message: "",
        formData: new FormData(),
        error: null,
    };
    const [state, action, isPending] = useActionState(loginAction, initialState)

    // Show toast notifications based on the login state
    useEffect(() => {
        if (state.success && state.message && !isPending) {
            toast.success(state.message || "Login successful!");
            
            // verify token and get roles, then set roles state
            const decodedToken = verifyToken(token);
            const roles = decodedToken?.roles || "Student";

            // redirect based on its roles
            if (roles === "Student") {
                router.replace("/")
            } else if (roles === "Admin" || roles === "Advisor") {
                router.replace("/admin")
            } else if (roles === "Teacher") {
                router.replace("/teacher")
            } else {
                router.replace("/")
            }
        }
        if (!state.success && state.message && !isPending) {
            toast.error(state.message || "Login failed!");
        }
    }, [state.success, state.message, isPending, router, token]);

    return (
        <div className="min-h-screen w-full bg-[url('/login_img.png')] bg-cover bg-center flex items-center justify-center">

            <div className="container mx-auto px-2 py-10 rounded-2xl overflow-hidden">

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="w-87.5 p-2 md:p-8 rounded-2xl bg-white/10 backdrop-blur-xs shadow-xl border border-white/40">

                        <h2 className="text-white text-center text-2xl font-semibold mb-6">Your Login</h2>

                        <form action={action} className="space-y-4">

                            <div>
                                <label className="text-white text-sm block mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="w-full p-3 rounded-md bg-white text-gray-700 outline-none"
                                    defaultValue={state.formData.get("email") as string}
                                    autoFocus
                                />
                                {state.error && state.error.email && <InputMessageError message={state.error.email[0]} />}
                            </div>

                            <div className="relative">
                                <div>
                                    <label className="text-white text-sm block mb-1">
                                        Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        className="w-full p-3 rounded-md bg-white text-gray-700 outline-none pe-10"
                                        defaultValue={state.formData.get("password") as string}
                                    />
                                    {state.error && state.error.password && <InputMessageError message={state.error.password[0]} />}
                                </div>
                                {
                                    showPassword ? (
                                        <EyeOff
                                            size={20}
                                            onClick={() => setShowPassword(false)}
                                            className="absolute right-3 top-9 cursor-pointer text-black"
                                        />
                                    ) : (
                                        <EyeIcon
                                            size={20}
                                            onClick={() => setShowPassword(true)}
                                            className="absolute right-3 top-9 cursor-pointer text-black"
                                        />
                                    )
                                }
                            </div>

                            <Link href="/forgot-password" className="text-sm text-gray-700 hover:text-gray-900 hover:underline -mt-3 block text-right ">
                                Forgot Password?
                            </Link>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-[#00284d] text-white py-3 rounded-md mt-3 hover:bg-[#003465] transition cursor-pointer"
                            >
                                {isPending ? <Loader /> : "Sign In"}
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;