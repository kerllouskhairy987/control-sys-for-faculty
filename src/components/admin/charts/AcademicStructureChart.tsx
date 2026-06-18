'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ControlStatistics } from '@/types';

interface AcademicStructureChartProps {
    statistics: ControlStatistics | null;
    isLoading: boolean;
}

export function AcademicStructureChart({ statistics, isLoading }: AcademicStructureChartProps) {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic Structure</h3>
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg animate-pulse" />
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic Structure</h3>
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No data available
                </div>
            </div>
        );
    }

    const data = [
        {
            name: 'Departments',
            value: statistics.totalDepartments,
        },
        {
            name: 'Programs',
            value: statistics.totalPrograms,
        },
        {
            name: 'Faculties',
            value: statistics.totalFaculties,
        },
        {
            name: 'Course Offerings',
            value: statistics.totalCourseOfferings,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Academic Structure</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00284d" name="Count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
