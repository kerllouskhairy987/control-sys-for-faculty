'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ControlStatistics } from '@/types';

interface StudentStatusChartProps {
    statistics: ControlStatistics | null;
    isLoading: boolean;
}

export function StudentStatusChart({ statistics, isLoading }: StudentStatusChartProps) {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Status Distribution</h3>
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg animate-pulse" />
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Status Distribution</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No data available
                </div>
            </div>
        );
    }

    const data = [
        { name: 'Active', value: statistics.activeStudents, fill: '#10b981' },
        { name: 'Warning', value: statistics.warningStudents, fill: '#f59e0b' },
        { name: 'Dismissed', value: statistics.dismissedStudents, fill: '#ef4444' },
        { name: 'Graduated', value: statistics.graduatedStudents, fill: '#3b82f6' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
