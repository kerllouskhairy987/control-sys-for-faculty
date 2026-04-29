/**
 * Student Distribution Chart Component
 * Displays pie/bar chart of students by status
 */

'use client';

import { useEffect, useState } from 'react';
import { StudentStatistics } from '@/types';
import { getStudentStatisticsAction } from '@/server/studentActions';

export function StudentDistributionChart() {
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
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-80 bg-gray-100 rounded animate-pulse" />
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    const total = stats.totalStudents || 1;
    const activePercent = ((stats.activeStudents / total) * 100).toFixed(1);
    const warningPercent = ((stats.warningStudents / total) * 100).toFixed(1);
    const dismissedPercent = ((stats.dismissedStudents / total) * 100).toFixed(1);

    // Calculate angles for pie chart
    const activeAngle = (stats.activeStudents / total) * 360;
    const warningAngle = (stats.warningStudents / total) * 360;
    const dismissedAngle = (stats.dismissedStudents / total) * 360;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Distribution</h3>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Pie Chart SVG */}
                <div className="flex-1 flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow">
                        {/* Active Segment */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="40"
                            strokeDasharray={`${(activeAngle / 360) * 502.4} 502.4`}
                            transform="rotate(-90 100 100)"
                        />
                        {/* Warning Segment */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="40"
                            strokeDasharray={`${(warningAngle / 360) * 502.4} 502.4`}
                            strokeDashoffset={`-${(activeAngle / 360) * 502.4}`}
                            transform="rotate(-90 100 100)"
                        />
                        {/* Dismissed Segment */}
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="40"
                            strokeDasharray={`${(dismissedAngle / 360) * 502.4} 502.4`}
                            strokeDashoffset={`-${((activeAngle + warningAngle) / 360) * 502.4}`}
                            transform="rotate(-90 100 100)"
                        />
                        {/* Center Text */}
                        <text
                            x="100"
                            y="100"
                            textAnchor="middle"
                            dy="0.3em"
                            className="text-2xl font-bold"
                            fill="#1f2937"
                        >
                            {total}
                        </text>
                    </svg>
                </div>

                {/* Legend and Stats */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Active</p>
                            <p className="text-lg font-bold text-gray-900">
                                {stats.activeStudents} ({activePercent}%)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Warning</p>
                            <p className="text-lg font-bold text-gray-900">
                                {stats.warningStudents} ({warningPercent}%)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Dismissed</p>
                            <p className="text-lg font-bold text-gray-900">
                                {stats.dismissedStudents} ({dismissedPercent}%)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
