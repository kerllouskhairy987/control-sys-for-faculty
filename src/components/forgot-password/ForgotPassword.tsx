"use client";

import { useActionState, useEffect, useState } from 'react'
import Loader from '../ui/Loader'
import { forgotPasswordAction, forgotPasswordStates } from '@/server/ForgotPasswordAction'
import InputMessageError from '../ui/InputMessageError';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const router = useRouter();

    const initialState: forgotPasswordStates = {
        success: false,
        message: "",
        formData: new FormData(),
        error: null
    };

    const [state, action, isPending] = useActionState(forgotPasswordAction, initialState);

    // Show toast notifications based on the forgot password state
    useEffect(() => {
        if (state.success && state.message && !isPending) {
            router.replace("/confirmed-done")
            toast.success(state.message || "Password reset link sent!");
        }
        if (!state.success && state.message && !isPending) {
            toast.error(state.message || "Password reset link failed!");
        }
    }, [state.success, state.message, isPending, router]);

    if (state.success && state.message && !isPending) {
        localStorage.setItem("email", email);
    }

    return (
        <div className="min-h-screen w-full bg-[url('/login_img.png')] bg-cover bg-center flex items-center justify-center">

            <div className="container mx-auto px-2 py-10 rounded-2xl overflow-hidden">

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="w-87.5 p-2 md:p-8 rounded-2xl bg-white/10 backdrop-blur-xs shadow-xl border border-white/40">

                        <h2 className="text-white text-center text-2xl font-semibold mb-6">Forgot Password</h2>

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
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {state.error && state.error.email && <InputMessageError message={state.error.email[0]} />}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-[#00284d] text-white py-3 rounded-md mt-3 hover:bg-[#003465] transition cursor-pointer"
                            >
                                {isPending ? <Loader /> : "Send Reset Link"}
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword