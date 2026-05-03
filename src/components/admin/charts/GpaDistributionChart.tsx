/**
 * GPA Distribution Chart Component
 * Displays bar chart of GPA distribution — static data, no async
 */

import { gpaDistribution } from '@/data/dashboard';

export function GpaDistributionChart() {
    const maxValue = Math.max(...Object.values(gpaDistribution), 1);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">GPA Distribution</h3>

            <div className="space-y-6">
                {Object.entries(gpaDistribution).map(([range, count]) => {
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
