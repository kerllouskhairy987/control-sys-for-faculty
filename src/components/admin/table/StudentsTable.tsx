/**
 * Students Table Component
 * Renders a static list of students — no fetching, search, filter, or pagination
 */

'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { Student } from '@/types';
import { getStatusBadgeClass } from '@/utils/statusBadgeColor';
import { PROGRAMS } from '@/data/students';

interface StudentsTableProps {
    students: Student[];
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
}

export function StudentsTable({ students, onEdit, onDelete }: StudentsTableProps) {
    const getProgramName = (programId: string) =>
        PROGRAMS.find((p) => p.id === programId)?.name ?? 'Unknown';

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Academic #</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Program</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">GPA</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {student.fullName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{student.academicNumber}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {getProgramName(student.programId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(student.status)}`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {student.gpa.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onEdit?.(student)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit student"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(student)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Delete student"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
