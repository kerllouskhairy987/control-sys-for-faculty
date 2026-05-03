'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { Department } from '@/types';
import { useEffect, useState } from 'react';
import { getAllDepartment } from '@/server/DepartmentActions';
import { useRouter } from 'next/navigation';

interface StudentsTableProps {
    onEdit?: (department: Department) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIdForDeleteItem: React.Dispatch<React.SetStateAction<string | null>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete?: (department: Department) => void;
}

export function DepartmentsTable({ onEdit, setIsModalOpen, setIdForDeleteItem,setIsEditing, onDelete }: StudentsTableProps) {

    const router = useRouter();
    const [departmentsData, setDepartmentData] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getAllDepartment();
                setDepartmentData(data);
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
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Programs</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            // Skeleton
                            Array.from({ length: 6 }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-56 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-10 bg-gray-200 rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : !departmentsData || departmentsData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No departments found.
                                </td>
                            </tr>
                        ) : (
                            departmentsData.map((department) => (
                                <tr key={department.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {department.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {department.description}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {department.programs?.map(ele => (
                                            <p key={ele.id}>👉🏻 {ele.name}</p>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setIsModalOpen(true);
                                                    onEdit?.(department)
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    onDelete?.(department);
                                                    setIdForDeleteItem(department.id as string);
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
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