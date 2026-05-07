/**
 * Students Management Page
 * Uses static data — no server actions, no loading states
 */

'use client';

import { useState } from 'react';
import { ConfirmationDialog } from '@/components/admin/modals/ConfirmationDialog';
import { Program } from '@/types';
import toast from 'react-hot-toast';
import { ProgramsTable } from '../table/ProgramsTable';
import { ProgramsModal } from '../modals/ProrgramsModal';
import { deleteProgram } from '@/server/ProgramsActions';
import { useRouter } from 'next/navigation';

export default function ProgramsPage() {
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [idForDeleteItem, setIdForDeleteItem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        program: Program | null;
    }>({ isOpen: false, program: null });

    const handleAddNew = () => {
        setIsEditing(false);
        setSelectedProgram(null);
        setIsModalOpen(true);
    };

    const handleEdit = (program: Program) => {
        setSelectedProgram(program);
        setIsModalOpen(true);
    };

    const handleDelete = (program: Program) => {
        setDeleteConfirmation({ isOpen: true, program });
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            const res = await deleteProgram(idForDeleteItem as string);

            if (res.success && res.message && res.error === null) {
                toast.success(res.message);
            } else {
                toast.error(res.message || "INTERNAL Server Error!");
            }
            window.location.reload();
        } catch {
            toast.error("Delete failed");
        } finally {
            setIsLoading(false);
            setDeleteConfirmation({ isOpen: false, program: null });
        }
        router.refresh();
    };



    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProgram(null);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Programs Management</h2>
                    <p className="mt-1 text-gray-600">Manage and view all Programs in the system</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition font-medium"
                >
                    + Add New Programs
                </button>
            </div>

            {/* Departments Table */}
            <ProgramsTable
                // students={students}
                onEdit={handleEdit}
                setIdForDeleteItem={setIdForDeleteItem}
                onDelete={handleDelete}
                setIsModalOpen={setIsModalOpen}
                setIsEditing={setIsEditing}
            />

            {/* Department Modal */}
            {
                isModalOpen && (
                    <ProgramsModal
                        setIsModalOpen={setIsModalOpen}
                        isEditing={isEditing}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        defaultValuesForEdit={selectedProgram}
                    />
                )
            }

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={deleteConfirmation.isOpen}
                title="Delete Program"
                message={
                    <>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-red-500">
                            {deleteConfirmation.program?.name}?
                        </span>{" "}
                        This action cannot be undone.
                    </>
                }
                isLoading={isLoading}
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteConfirmation({ isOpen: false, program: null })}
            />
        </div>
    );
}
