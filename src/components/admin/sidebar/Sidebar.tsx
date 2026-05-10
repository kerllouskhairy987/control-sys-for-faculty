/**
 * Sidebar Component
 * Collapsible sidebar with User dropdown menu
 */

'use client';

import { useState } from 'react';
import { ChevronDown, BarChart3, Users, BookOpen, Menu, X, BellElectric, HousePlus, MonitorCog, Warehouse } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const [isExpanded, setIsExpanded] = useState(isOpen);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleUserDropdownClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden z-40"
                    onClick={() => {
                        setIsExpanded(false);
                        onClose?.();
                    }}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen bg-linear-to-b from-[#00284d] to-[#003465] text-white shadow-xl transition-all duration-300 z-50 ${isExpanded ? 'w-64 lg:w-64' : 'w-20 lg:w-20'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                    {isExpanded && (
                        <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
                    >
                        {isExpanded ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition"
                    >
                        {isExpanded ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* Dashboard */}
                    <SidebarItem
                        label="Dashboard"
                        href="/admin"
                        icon={BarChart3}
                        isExpanded={isExpanded}
                    />

                    {/* User Dropdown */}
                    <div>
                        <button
                            onClick={handleUserDropdownClick}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${isUserDropdownOpen
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Users size={20} />
                            {isExpanded && (
                                <>
                                    <span className="text-sm flex-1 text-left">Users</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </>
                            )}
                        </button>

                        {/* Dropdown Menu */}
                        {isUserDropdownOpen && isExpanded && (
                            <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/20 pl-2">
                                <SidebarItem
                                    label="Students"
                                    href="/admin/students"
                                    icon={BookOpen}
                                    isExpanded={isExpanded}
                                    onClick={() => setIsUserDropdownOpen(false)}
                                />
                                <SidebarItem
                                    label="Professors"
                                    href="/admin/professors"
                                    icon={BookOpen}
                                    isExpanded={isExpanded}
                                    onClick={() => setIsUserDropdownOpen(false)}
                                />
                            </div>
                        )}

                        {/* Collapsed View - Direct Links */}
                        {!isExpanded && isUserDropdownOpen && (
                            <div className="mt-2 space-y-1">
                                <SidebarItem
                                    label="Students"
                                    href="/admin/students"
                                    icon={BookOpen}
                                    isExpanded={false}
                                />
                                <SidebarItem
                                    label="Professors"
                                    href="/admin/professors"
                                    icon={BookOpen}
                                    isExpanded={false}
                                />
                            </div>
                        )}
                    </div>

                    {/* Department */}
                    <SidebarItem
                        label="Departments"
                        href="/admin/departments"
                        icon={BellElectric}
                        isExpanded={isExpanded}
                    />

                    {/* Programs */}
                    <SidebarItem
                        label="Programs"
                        href="/admin/programs"
                        icon={HousePlus}
                        isExpanded={isExpanded}
                    />

                    {/* control engine */}
                    <SidebarItem
                        label="Control Engine"
                        href="/admin/control-engine"
                        icon={MonitorCog}
                        isExpanded={isExpanded}
                    />

                    {/* Faculty */}
                    <SidebarItem
                        label="Faculty"
                        href="/admin/faculty"
                        icon={Warehouse}
                        isExpanded={isExpanded}
                    />
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/20 text-center">
                    {isExpanded && <p className="text-xs text-white/50">© 2024 SIS Admin</p>}
                </div>
            </aside>

            {/* Spacer for main content */}
            <div className={`transition-all duration-300 ${isExpanded ? 'lg:ml-64' : 'lg:ml-20'}`} />
        </>
    );
}
