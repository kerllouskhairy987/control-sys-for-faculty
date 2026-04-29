/**
 * GPA Distribution Chart Component
 * Displays bar chart of GPA distribution
 */

'use client';

import { useEffect, useState } from 'react';
import { Student } from '@/types';
import { getStudentsAction } from '@/server/studentActions';

export function GpaDistributionChart() {
    const [distribution, setDistribution] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getStudentsAction(1, undefined, undefined, 1000);
                if (result.success && result.data?.data) {
                    // Calculate GPA ranges
                    const ranges: Record<string, number> = {
                        '3.5-4.0': 0,
                        '3.0-3.5': 0,
                        '2.5-3.0': 0,
                        '2.0-2.5': 0,
                        '0-2.0': 0,
                    };

                    result.data.data.forEach((student: Student) => {
                        if (student.gpa >= 3.5) ranges['3.5-4.0']++;
                        else if (student.gpa >= 3.0) ranges['3.0-3.5']++;
                        else if (student.gpa >= 2.5) ranges['2.5-3.0']++;
                        else if (student.gpa >= 2.0) ranges['2.0-2.5']++;
                        else ranges['0-2.0']++;
                    });

                    setDistribution(ranges);
                }
            } catch (error) {
                console.error('Failed to fetch GPA data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-80 bg-gray-100 rounded animate-pulse" />
            </div>
        );
    }

    const maxValue = Math.max(...Object.values(distribution), 1);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">GPA Distribution</h3>

            <div className="space-y-6">
                {Object.entries(distribution).map(([range, count]) => {
                    const percentage = ((count / maxValue) * 100).toFixed(0);
                    return (
                        <div key={range}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">{range} GPA</span>
                                <span className="text-sm font-semibold text-gray-900">{count} students</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-[#00284d] to-[#003465] h-full rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> GPA ranges help identify students needing
                    academic support. Students below 2.0 GPA are flagged for intervention.
                </p>
            </div>
        </div>
    );
}
