/**
 * Students Table Component
 * Renders a static list of students — no fetching, search, filter, or pagination
 */

"use client";

import { useEffect, useState } from "react";
import { Department, Faculty, Student } from "@/types";
import { useRouter } from "next/navigation";
import { getAllFacultyMember } from "@/server/FacultyAction";
import { getAllDepartment } from "@/server/DepartmentActions";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";

interface FacultyTableProps {
    students: Student[];
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    setIdForDeleteItem: React.Dispatch<React.SetStateAction<string | null>>;
}

export function FacultyTable({
    students,
    onEdit,
    onDelete,
    setIdForDeleteItem,
}: FacultyTableProps) {
    const router = useRouter();
    const [selectedFacultyData, setSelectedFacultyData] = useState<Faculty[]>([]);
    const [departmentsData, setDepartmentData] = useState<Department[]>([]);

    const [selectedStatus, selectedSetStatus] = useState<string | undefined>(undefined);
    const [selectedDepartmentId, selectedSetDepartmentId] = useState<string>("");

    const [search, setSearch] = useState('');
    // states for pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    console.log("search", search, pageSize, totalPages)

    const [isLoading, setIsLoading] = useState(true);

    // get all programs
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // get all department
                const allDepartments = await getAllDepartment({});
                setDepartmentData(allDepartments.items);

                const allFacultyMember = await getAllFacultyMember({
                    departmentId: selectedDepartmentId,
                    status: selectedStatus,
                    search,
                    page,
                    pageSize
                });
                setSelectedFacultyData(allFacultyMember.items);
                // for pagination
                setPage(allFacultyMember.page)
                setTotalPages(allDepartments.totalPages);
                router.refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [router, selectedStatus, selectedDepartmentId, search, page, pageSize]);

    return (
        <>
            {/* Search And Filter */}
            <div className="flex flex-col mb-3">
                <label htmlFor="search">Search</label>
                <input
                    type="search"
                    defaultValue={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    placeholder="Search By Name"
                    className="border p-2 rounded-xl grow"
                />
            </div>

            {/* Select Department and Status */}
            <div>
                {
                    departmentsData
                        ? (
                            <>
                                <h2 className={`mb-1 ${selectedDepartmentId ? "text-green-500" : "text-amber-700"} font-bold`}>Select Department And Status</h2>
                                <div className="flex items-center gap-4 bg-gray-200 p-2 rounded-xl">
                                    {/* select department */}
                                    <select
                                        className={`w-full border p-2 rounded-xl ${selectedDepartmentId ? "border-green-500" : "border-amber-700"}`}
                                        value={selectedDepartmentId}
                                        onChange={(e) => selectedSetDepartmentId(e.target.value)}
                                    >
                                        <option value={""} disabled>
                                            Select a department
                                        </option>
                                        <option value="">ALL</option>
                                        {departmentsData.length > 0 && (
                                            departmentsData.map((department) => (
                                                <option key={department.id} value={department.id}>
                                                    {department.name}
                                                </option>
                                            ))
                                        )}
                                    </select>

                                    {/* select status */}
                                    <select
                                        className="w-full border p-2 rounded-xl"
                                        value={selectedStatus}
                                        onChange={(e) => selectedSetStatus(e.target.value)}
                                    >
                                        <option value={""} disabled>
                                            Select a status
                                        </option>
                                        <option value={""}>ALL</option>
                                        <option value="0">active</option>
                                        <option value="1">signed</option>
                                        <option value="2">retired</option>
                                        <option value="3">dismissed</option>
                                    </select>
                                </div>
                            </>
                        )
                        : (
                            <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-red-700 shadow-sm">

                                <div className="flex items-center gap-3">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-7 shrink-0"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m0 3.75h.007v.008H12v-.008Zm0-15.75a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
                                        />
                                    </svg>

                                    <div>
                                        <h2 className="font-semibold text-red-800">
                                            No Department Found
                                        </h2>

                                        <p className="text-sm text-red-600">
                                            You need to create a department first before adding faculty members.
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href="/admin/departments"
                                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                >
                                    Go to Departments
                                </Link>
                            </div>
                        )
                }
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Head */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Degree
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Department Name #
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {/* body */}

                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
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

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : selectedFacultyData ? (
                                selectedFacultyData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            No Faculty Member Found.
                                        </td>
                                    </tr>
                                ) : (
                                    selectedFacultyData.map((faculty) => (
                                        <tr
                                            key={faculty.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {faculty.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {faculty.degree}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {faculty.departmentName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {faculty.status}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/faculty/${faculty.id}`}
                                                        // onClick={() => {
                                                        //     setIsEditing(true);
                                                        //     setIsModalOpen(true);
                                                        //     onEdit?.(program)
                                                        // }}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4">
                                        <div className="flex items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-700 shadow-sm">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6 shrink-0"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m0 3.75h.007v.008H12v-.008ZM10.34 3.94 1.82 18a1.875 1.875 0 0 0 1.605 2.813h17.15A1.875 1.875 0 0 0 22.18 18L13.66 3.94a1.875 1.875 0 0 0-3.32 0Z"
                                                />
                                            </svg>

                                            <div>
                                                <h2 className="font-semibold">
                                                    Department Required
                                                </h2>

                                                <p className="text-sm text-amber-600">
                                                    Please choose a department first from the list above.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}
            />
        </>
    );
}
