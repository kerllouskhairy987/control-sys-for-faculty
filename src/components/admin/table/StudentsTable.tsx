/**
 * Students Table Component
 * Custom table with search, filter, pagination, and CRUD actions
 */

'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Student, StudentStatus } from '@/types';
import { getStudentsAction } from '@/server/studentActions';
import { getProgramName } from '@/server/studentService';
import { getStatusBadgeClass } from '@/utils/statusBadgeColor';

interface StudentsTableProps {
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    onAddNew?: () => void;
}

export function StudentsTable({ onEdit, onDelete, onAddNew }: StudentsTableProps) {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StudentStatus | 'All'>('All');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Fetch students
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const result = await getStudentsAction(
                    currentPage,
                    debouncedSearch || undefined,
                    statusFilter === 'All' ? undefined : statusFilter,
                    pageSize
                );

                if (result.success && result.data) {
                    setStudents(result.data.data);
                    setTotalPages(result.data.pagination.totalPages);
                }
            } catch (error) {
                console.error('Failed to fetch students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [currentPage, debouncedSearch, statusFilter, pageSize]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value as StudentStatus | 'All');
        setCurrentPage(1); // Reset to first page
    };

    if (loading && students.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow">
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
                        <tbody>
                            {[...Array(10)].map((_, i) => (
                                <tr key={i} className="border-b border-gray-100 animate-pulse">
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
                                    <td className="px-6 py-4 h-4 bg-gray-200 rounded" />
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
        );
    }

    return (
        <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or academic number..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition"
                />
                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Warning">Warning</option>
                    <option value="Dismissed">Dismissed</option>
                </select>
            </div>

            {/* Table */}
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
                                        No students found. Try adjusting your search or filters.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {student.fullName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {student.academicNumber}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {getProgramName(student.programId)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                                    student.status
                                                )}`}
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

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing page <span className="font-semibold">{currentPage}</span> of{' '}
                    <span className="font-semibold">{totalPages || 1}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                        className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
