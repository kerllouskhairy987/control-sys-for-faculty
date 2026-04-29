/**
 * Admin Layout Component
 * Main wrapper for all admin pages
 */

'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar/Sidebar';
import { Header } from './header/Header';
import { MainContent } from './MainContent';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    // Determine page title based on current route
    const pageTitle = useMemo(() => {
        if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard';
        if (pathname.includes('/students')) return 'Student Management';
        if (pathname.includes('/professors')) return 'Professor Management';
        return 'Admin Dashboard';
    }, [pathname]);

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className={`flex grow flex-col overflow-x-auto ${sidebarOpen ? 'ms-20 lg:ms-0' : ''}`}>
                {/* Header */}
                <Header title={pageTitle} onMenuClick={handleMenuClick} />

                {/* Page Content */}
                <MainContent>{children}</MainContent>
            </div>
        </div>
    );
}
