/**
 * Professors Management Page
 * Renders static professor data — no fetching, no pagination
 */

import { professors, DEPARTMENTS } from '@/data/professors';

function getDepartmentName(departmentId: string) {
    return DEPARTMENTS.find((d) => d.id === departmentId)?.name ?? 'Unknown';
}

export default function ProfessorsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Professor Management</h2>
                    <p className="mt-1 text-gray-600">Manage and view all professors in the system</p>
                </div>
                <button className="px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition font-medium">
                    Add New Professor
                </button>
            </div>

            {/* Professors Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Specialization</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {professors.map((professor) => (
                                <tr key={professor.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {professor.fullName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{professor.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{professor.specialization}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {getDepartmentName(professor.departmentId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{professor.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
