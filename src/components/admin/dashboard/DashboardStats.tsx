/**
 * Dashboard Statistics Component
 * Displays all student statistics
 */

'use client';

import { useEffect, useState } from 'react';
import { Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { StatisticCard } from '../cards/StatisticCard';
import { StudentStatistics } from '@/types';
import { getStudentStatisticsAction } from '@/server/studentActions';

export function DashboardStats() {
    const [stats, setStats] = useState<StudentStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await getStudentStatisticsAction();
                if (result.success && result.data) {
                    setStats(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-lg shadow animate-pulse h-32"
                    />
                ))}
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatisticCard
                title="Total Students"
                value={stats.totalStudents}
                icon={Users}
                iconBgColor="bg-blue-500"
                trend={{ value: 12, isPositive: true }}
                description="All enrolled students"
            />

            <StatisticCard
                title="Active Students"
                value={stats.activeStudents}
                icon={CheckCircle}
                iconBgColor="bg-green-500"
                trend={{ value: 8, isPositive: true }}
                description="Good academic standing"
            />

            <StatisticCard
                title="Academic Warnings"
                value={stats.warningStudents}
                icon={AlertCircle}
                iconBgColor="bg-yellow-500"
                description="Below 3.0 GPA threshold"
            />

            <StatisticCard
                title="Average GPA"
                value={stats.averageGPA.toFixed(2)}
                icon={TrendingUp}
                iconBgColor="bg-purple-500"
                description="Overall cohort GPA"
            />
        </div>
    );
}
