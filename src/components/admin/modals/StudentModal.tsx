/**
 * Student Modal Component
 * Modal wrapper for student form
 */

'use client';

import { Student, StudentFormData } from '@/types';
import { StudentForm } from '../forms/StudentForm';
import { X } from 'lucide-react';

interface StudentModalProps {
    isOpen: boolean;
    student?: Student | null;
    onClose: () => void;
    onSubmit: (data: StudentFormData) => Promise<void>;
    isLoading?: boolean;
}

export function StudentModal({
    isOpen,
    student,
    onClose,
    onSubmit,
    isLoading = false,
}: StudentModalProps) {
    if (!isOpen) return null;

    const isEditing = !!student;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div
                    className="bg-white rounded-lg shadow-xl max-w-2xl w-full animate-in fade-in zoom-in-95 my-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {isEditing ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                            aria-label="Close"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        <StudentForm
                            student={student || null}
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                            onCancel={onClose}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
