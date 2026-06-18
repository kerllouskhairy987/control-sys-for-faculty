'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/ui/Loader';
import { createCourse } from '@/server/Courses';
import { getAllDepartment } from '@/server/DepartmentActions';
import { Department } from '@/types';
import { CreateCourseSchema } from '@/validation/course';

interface CourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CourseModal({ isOpen, onClose, onSuccess }: CourseModalProps) {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [departmentId, setDepartmentId] = useState('');
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [credits, setCredits] = useState('3');
    const [lectureHours, setLectureHours] = useState('3');
    const [labHours, setLabHours] = useState('0');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDepts, setIsLoadingDepts] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
        }
    }, [isOpen]);

    const fetchDepartments = async () => {
        try {
            setIsLoadingDepts(true);
            const data = await getAllDepartment({});
            setDepartments(data.items || []);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch departments');
        } finally {
            setIsLoadingDepts(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            // Validate input
            const validation = CreateCourseSchema.safeParse({
                departmentId,
                code,
                title,
                description,
                credits: parseInt(credits),
                lectureHours: parseInt(lectureHours),
                labHours: parseInt(labHours),
            });

            if (!validation.success) {
                const fieldErrors: Record<string, string> = {};
                const flatErrors = validation.error.flatten().fieldErrors;
                Object.entries(flatErrors).forEach(([key, messages]) => {
                    if (messages && messages.length > 0) {
                        fieldErrors[key] = messages[0];
                    }
                });
                setErrors(fieldErrors);
                setIsLoading(false);
                return;
            }

            const res = await createCourse({
                departmentId,
                code,
                title,
                description,
                credits: parseInt(credits),
                lectureHours: parseInt(lectureHours),
                labHours: parseInt(labHours),
            });

            if (res.success) {
                toast.success(res.message);
                onSuccess();
            } else {
                toast.error(res.message || 'An error occurred');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed z-40 inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-1/2 z-50 p-4 overflow-y-auto max-h-[90vh]">
                <div
                    className="bg-white rounded-lg shadow-xl max-w-md w-full animate-in fade-in zoom-in-95 my-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Add New Course
                        </h2>
                        <button
                            onClick={onClose}
                            disabled={isLoading || isLoadingDepts}
                            className="p-1 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                            aria-label="Close"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                        {/* Department ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department *
                            </label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                                disabled={isLoading || isLoadingDepts}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                                <p className="text-red-500 text-sm mt-1">{errors.departmentId}</p>
                            )}
                        </div>

                        {/* Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course Code *
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                disabled={isLoading}
                                placeholder="e.g., CS101"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                                placeholder="e.g., Introduction to Programming"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isLoading}
                                placeholder="Course description"
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Credits */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Credits *
                            </label>
                            <input
                                type="number"
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                                disabled={isLoading}
                                min="1"
                                max="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {errors.credits && (
                                <p className="text-red-500 text-sm mt-1">{errors.credits}</p>
                            )}
                        </div>

                        {/* Lecture Hours */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lecture Hours *
                            </label>
                            <input
                                type="number"
                                value={lectureHours}
                                onChange={(e) => setLectureHours(e.target.value)}
                                disabled={isLoading}
                                min="0"
                                max="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {errors.lectureHours && (
                                <p className="text-red-500 text-sm mt-1">{errors.lectureHours}</p>
                            )}
                        </div>

                        {/* Lab Hours */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lab Hours *
                            </label>
                            <input
                                type="number"
                                value={labHours}
                                onChange={(e) => setLabHours(e.target.value)}
                                disabled={isLoading}
                                min="0"
                                max="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            {errors.labHours && (
                                <p className="text-red-500 text-sm mt-1">{errors.labHours}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading || isLoadingDepts}
                                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || isLoadingDepts}
                                className="flex-1 px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader /> : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
