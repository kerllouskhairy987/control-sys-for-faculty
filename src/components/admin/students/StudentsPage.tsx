/**
 * Students Management Page
 * Uses static data — no server actions, no loading states
 */

'use client';

import { useState } from 'react';
import { StudentsTable } from '@/components/admin/table/StudentsTable';
import { StudentModal } from '@/components/admin/modals/StudentModal';
import { ConfirmationDialog } from '@/components/admin/modals/ConfirmationDialog';
import { Student } from '@/types';
import { students } from '@/data/students';
import toast from 'react-hot-toast';
import { dismissStudent } from '@/server/StudentsAction';
import { useRouter } from 'next/navigation';

export default function StudentsPage() {
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [idForDeleteItem, setIdForDeleteItem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        student: Student | null;
    }>({ isOpen: false, student: null });

    const handleAddNew = () => {
        setIsEditing(false);
        setSelectedStudent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = (student: Student) => {
        setDeleteConfirmation({ isOpen: true, student });
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            const res = await dismissStudent(idForDeleteItem as string);

            if (res.success && res.message && res.error === null) {
                toast.success(res.message);
            } else {
                toast.error(res.message || "INTERNAL Server Error!");
            }
            window.location.reload();
        } catch {
            toast.error("Dismiss failed");
        } finally {
            setIsLoading(false);
            setDeleteConfirmation({ isOpen: false, student: null });
        }
        router.refresh();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
                    <p className="mt-1 text-gray-600">Manage and view all students in the system</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition font-medium"
                >
                    + Add New Student
                </button>
            </div>

            {/* Students Table */}
            <StudentsTable
                students={students}
                setIdForDeleteItem={setIdForDeleteItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Student Modal */}
            <StudentModal
                setIsModalOpen={setIsModalOpen}
                isEditing={isEditing}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                defaultValuesForEdit={selectedStudent}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={deleteConfirmation.isOpen}
                title="Delete Student"
                message={
                    <>
                        Are you sure you want to dismiss{" "}
                        <span className="font-semibold text-red-500">
                            {deleteConfirmation.student?.fullName}?
                        </span>{" "}
                        This action cannot be undone.
                    </>
                }
                isLoading={isLoading}
                confirmText="Dismiss"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteConfirmation({ isOpen: false, student: null })}
            />
        </div>
    );
}
