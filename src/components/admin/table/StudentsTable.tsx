/**
 * Students Table Component
 * Renders a static list of students — no fetching, search, filter, or pagination
 */

"use client";

import { Student } from "@/types";
import { getStatusBadgeClass } from "@/utils/statusBadgeColor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllStudents } from "@/server/StudentsAction";

interface StudentsTableProps {
    students: Student[];
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    setIdForDeleteItem: React.Dispatch<React.SetStateAction<string | null>>
}

export function StudentsTable({
    students,
    onEdit,
    onDelete,
    setIdForDeleteItem
}: StudentsTableProps) {
    // const getProgramName = (programId: string) =>
    //     PROGRAMS.find((p) => p.id === programId)?.name ?? 'Unknown';

    const router = useRouter();
    const [studentsData, setStudentsData] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // get all programs
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getAllStudents();
                setStudentsData(data);
                router.refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [router]);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Head */}
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                fullName
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                academic Number
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                program Name #
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                cgpa
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                academic Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                academic Level
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    {/* Full Name */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* Academic Number */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* Program Name */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* CGPA */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                    </td>

                                    {/* Academic Level */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : studentsData.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        ) : (
                            studentsData.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {student.fullName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.academicNumber}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.programName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.cgpa?.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(student.academicStatus as string)}`}
                                        >
                                            {student.academicStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {student.academicLevel}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    onDelete?.(student)
                                                    setIdForDeleteItem(student.id)
                                                }}
                                                className="p-2 text-white bg-red-600 hover:bg-red-800 rounded-lg transition whitespace-nowrap"
                                                title="Delete student"
                                            >
                                                Dismiss Student
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
