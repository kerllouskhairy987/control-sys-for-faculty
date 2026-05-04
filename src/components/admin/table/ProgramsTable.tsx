'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { Department, Program } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllPrograms } from '@/server/ProgramsActions';
import Link from 'next/link';

interface StudentsTableProps {
    onEdit?: (program: Program) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIdForDeleteItem: React.Dispatch<React.SetStateAction<string | null>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete?: (program: Program) => void;
}

export function ProgramsTable({ onEdit, setIsModalOpen, setIdForDeleteItem, setIsEditing, onDelete }: StudentsTableProps) {

    const router = useRouter();
    const [programsData, setProgramsData] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // get all programs
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getAllPrograms();
                setProgramsData(data);
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
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Required Credits</th>
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
                        ) : !programsData || programsData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No Programs found.
                                </td>
                            </tr>
                        ) : (
                            programsData.map((program) => (
                                <tr key={program.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {program.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {program.departmentName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {program.requiredCredits}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/admin/programs/${program.id}`}
                                                // onClick={() => {
                                                //     setIsEditing(true);
                                                //     setIsModalOpen(true);
                                                //     onEdit?.(program)
                                                // }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    onDelete?.(program);
                                                    setIdForDeleteItem(program.id as string);
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