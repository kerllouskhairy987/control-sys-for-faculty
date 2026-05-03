"use client";

import { useActionState, useEffect, useState } from 'react';
import { EyeIcon, EyeOff } from 'lucide-react';
import { resetPasswordAction, resetPasswordStates } from '@/server/ResetPasswordAction';
import Loader from '../ui/Loader'
import InputMessageError from '../ui/InputMessageError';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialState: resetPasswordStates = {
        success: false,
        message: "",
        formData: new FormData(),
        error: null
    }
    const [state, action, isPending] = useActionState(resetPasswordAction, initialState);

    // Show toast notifications based on the reset password state
    useEffect(() => {
        if (state.success && state.message && !isPending) {
            router.replace("/login");
            toast.success(state.message || "Password reset successful!");
        }
        if (!state.success && state.message && !isPending) {
            toast.error(state.message || "Password reset failed!");
        }
    }, [state.success, state.message, isPending, router]);

    // for get userId and code form URL
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');
    console.log("userId", userId)
    console.log("code", code)

    return (
        <div className="min-h-screen w-full bg-[url('/login_img.png')] bg-cover bg-center flex items-center justify-center">

            <div className="container mx-auto px-2 py-10 rounded-2xl overflow-hidden">

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="w-87.5 p-2 md:p-8 rounded-2xl bg-white/10 backdrop-blur-xs shadow-xl border border-white/40">

                        <h2 className="text-white text-center text-2xl font-semibold mb-6">Reset Your Password</h2>

                        <form action={action} className="space-y-4">
                            {/* these inputs for send userId and code form URL */}
                            <input type="hidden" name='userId' value={userId as string} />
                            <input type="hidden" name='code' value={code as string} />

                            <div className="relative">
                                <div>
                                    <label className="text-white text-sm block mb-1">
                                        New Password
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

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-[#00284d] text-white py-3 rounded-md mt-3 hover:bg-[#003465] transition cursor-pointer"
                            >
                                {isPending ? <Loader /> : "Reset"}
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPasswordForm