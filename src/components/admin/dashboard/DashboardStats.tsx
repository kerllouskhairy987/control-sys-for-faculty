/**
 * Dashboard Statistics Component
 * Displays hardcoded student statistics — no async fetching
 */

import { Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { StatisticCard } from '../cards/StatisticCard';
import { dashboardStats } from '@/data/dashboard';

export function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatisticCard
                title="Total Students"
                value={dashboardStats.totalStudents}
                icon={Users}
                iconBgColor="bg-blue-500"
                trend={{ value: 12, isPositive: true }}
                description="All enrolled students"
            />

            <StatisticCard
                title="Active Students"
                value={dashboardStats.activeStudents}
                icon={CheckCircle}
                iconBgColor="bg-green-500"
                trend={{ value: 8, isPositive: true }}
                description="Good academic standing"
            />

            <StatisticCard
                title="Academic Warnings"
                value={dashboardStats.warningStudents}
                icon={AlertCircle}
                iconBgColor="bg-yellow-500"
                description="Below 3.0 GPA threshold"
            />

            <StatisticCard
                title="Average GPA"
                value={dashboardStats.averageGPA.toFixed(2)}
                icon={TrendingUp}
                iconBgColor="bg-purple-500"
                description="Overall cohort GPA"
            />
        </div>
    );
}
