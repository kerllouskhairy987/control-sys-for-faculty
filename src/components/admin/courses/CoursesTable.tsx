'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { Course } from '@/types';
import Link from 'next/link';

interface CoursesTableProps {
    data: Course[] | null;
    isLoading: boolean;
    onDelete: (course: Course) => void;
}

export function CoursesTable({ data, isLoading, onDelete }: CoursesTableProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Credits
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Hours
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            // Skeleton Loading
                            Array.from({ length: 6 }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-8 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : !data || data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No courses found.
                                </td>
                            </tr>
                        ) : (
                            data.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900">
                                        {course.code}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {course.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {course.departmentName || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {course.credits}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        L: {course.lectureHours} / Lab: {course.labHours}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/courses/${course.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => onDelete(course)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
