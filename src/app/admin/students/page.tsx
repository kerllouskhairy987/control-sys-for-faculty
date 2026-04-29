/**
 * Students Management Page
 */

'use client';

import { useState } from 'react';
import { Loader } from '@/components/ui/Loader';
import { StudentsTable } from '@/components/admin/table/StudentsTable';
import { StudentModal } from '@/components/admin/modals/StudentModal';
import { ConfirmationDialog } from '@/components/admin/modals/ConfirmationDialog';
import { Student, StudentFormData } from '@/types';
import {
    createStudentAction,
    updateStudentAction,
    deleteStudentAction,
} from '@/server/studentActions';
import toast from 'react-hot-toast';

export default function StudentsPage() {
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        student: Student | null;
    }>({ isOpen: false, student: null });
    const [isDeleting, setIsDeleting] = useState(false);
    const [tableKey, setTableKey] = useState(0);

    const handleAddNew = () => {
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
        if (!deleteConfirmation.student) return;

        setIsDeleting(true);
        try {
            const result = await deleteStudentAction(deleteConfirmation.student.id);
            if (result.success) {
                toast.success(result.message || 'Student deleted successfully');
                setTableKey((prev) => prev + 1); // Refresh table
            } else {
                toast.error(result.error || 'Failed to delete student');
            }
        } catch (error) {
            toast.error('Error deleting student');
        } finally {
            setIsDeleting(false);
            setDeleteConfirmation({ isOpen: false, student: null });
        }
    };

    const handleModalSubmit = async (formData: StudentFormData) => {
        setIsSubmitting(true);
        try {
            if (selectedStudent) {
                // Update mode
                const result = await updateStudentAction(selectedStudent.id, formData);
                if (result.success) {
                    toast.success(result.message || 'Student updated successfully');
                    setIsModalOpen(false);
                    setTableKey((prev) => prev + 1); // Refresh table
                } else {
                    toast.error(result.error || 'Failed to update student');
                }
            } else {
                // Create mode
                const result = await createStudentAction(formData);
                if (result.success) {
                    toast.success(result.message || 'Student created successfully');
                    setIsModalOpen(false);
                    setTableKey((prev) => prev + 1); // Refresh table
                } else {
                    toast.error(result.error || 'Failed to create student');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Error processing request');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        if (!isSubmitting) {
            setIsModalOpen(false);
            setSelectedStudent(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader />
            </div>
        );
    }

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
                    className="px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition disabled:opacity-50 font-medium"
                >
                    + Add New Student
                </button>
            </div>

            {/* Students Table */}
            <StudentsTable
                key={tableKey}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
            />

            {/* Student Modal */}
            <StudentModal
                isOpen={isModalOpen}
                student={selectedStudent}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                isLoading={isSubmitting}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={deleteConfirmation.isOpen}
                title="Delete Student"
                message={`Are you sure you want to delete ${deleteConfirmation.student?.fullName}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                isLoading={isDeleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteConfirmation({ isOpen: false, student: null })}
            />
        </div>
    );
}
