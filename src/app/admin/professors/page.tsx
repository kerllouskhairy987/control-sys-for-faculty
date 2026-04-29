/**
 * Professors Management Page
 */

export default function ProfessorsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Professor Management</h2>
                    <p className="mt-1 text-gray-600">Manage and view all professors in the system</p>
                </div>
                {/* "Add New Professor" button will be added here in Phase 4 */}
                <button className="px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition disabled:opacity-50">
                    Add New Professor
                </button>
            </div>

            {/* Search and Filter - Placeholder */}
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or specialization..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent disabled:bg-gray-100"
                    disabled
                />
            </div>

            {/* Professors Table - Placeholder */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Specialization</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {[...Array(10)].map((_, i) => (
                                <tr key={i} className="hover:bg-gray-50 animate-pulse">
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination - Placeholder */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">Showing 1 to 10 of loading...</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
