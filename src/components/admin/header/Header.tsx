/**
 * Header Component
 * Top navigation bar for admin dashboard
 */

'use client';

import { useState } from 'react';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    title?: string;
    onMenuClick?: () => void;
}

export function Header({ title = 'Dashboard' }: HeaderProps) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth and redirect to login
        localStorage.removeItem('auth_token');
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Left Side */}
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>

                {/* Right Side - User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#00284d] to-[#003465] rounded-full flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">Admin User</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="p-3 border-b border-gray-200">
                                <p className="text-sm font-semibold text-gray-800">Administrator</p>
                                <p className="text-xs text-gray-500">admin@university.edu</p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
