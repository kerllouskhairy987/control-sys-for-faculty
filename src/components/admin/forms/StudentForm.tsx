/**
 * Student Form Component
 * Form for creating and editing students with validation
 */

'use client';

import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '@/types';
import { PROGRAMS } from '@/server/mockData';
import { studentFormSchema } from '@/utils/validation';
import { generatePasswordAction } from '@/server/studentActions';
import { Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { ZodError } from 'zod';

interface StudentFormProps {
    student?: Student | null;
    onSubmit: (data: StudentFormData) => Promise<void>;
    isLoading?: boolean;
    onCancel?: () => void;
}

export function StudentForm({
    student,
    onSubmit,
    isLoading = false,
    onCancel,
}: StudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>({
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        fullName: '',
        academicNumber: '',
        nationalId: '',
        programId: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isGeneratingPassword, setIsGeneratingPassword] = useState(false);

    // Initialize form with student data if editing
    useEffect(() => {
        if (student) {
            setFormData({
                userName: student.userName,
                email: student.email,
                password: student.password,
                phoneNumber: student.phoneNumber,
                fullName: student.fullName,
                academicNumber: student.academicNumber,
                nationalId: student.nationalId,
                programId: student.programId,
            });
        }
    }, [student]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleGeneratePassword = async () => {
        setIsGeneratingPassword(true);
        try {
            const result = await generatePasswordAction();
            if (result.success && result.data) {
                setFormData((prev) => ({
                    ...prev,
                    password: result.data.password,
                }));
                toast.success('Password generated successfully!');
            } else {
                toast.error('Failed to generate password');
            }
        } catch (error) {
            toast.error('Error generating password');
        } finally {
            setIsGeneratingPassword(false);
        }
    };

    const handleCopyPassword = () => {
        if (formData.password) {
            navigator.clipboard.writeText(formData.password);
            toast.success('Password copied to clipboard!');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        try {
            studentFormSchema.parse(formData);
            setErrors({});
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as string;
                    newErrors[path] = err.message;
                });
                setErrors(newErrors);
            }
            return;
        }

        // Submit
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Row - Username and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username *
                    </label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.userName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., john_doe"
                        disabled={isLoading}
                    />
                    {errors.userName && (
                        <p className="mt-1 text-xs text-red-600">{errors.userName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., john@university.edu"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                </div>
            </div>

            {/* Second Row - Full Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., John Doe"
                        disabled={isLoading}
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., 1234567890"
                        disabled={isLoading}
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
                    )}
                </div>
            </div>

            {/* Third Row - Academic and National ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Academic Number *
                    </label>
                    <input
                        type="text"
                        name="academicNumber"
                        value={formData.academicNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.academicNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., STU-2024-001"
                        disabled={isLoading}
                    />
                    {errors.academicNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.academicNumber}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        National ID *
                    </label>
                    <input
                        type="text"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.nationalId ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="e.g., NAT-123456"
                        disabled={isLoading}
                    />
                    {errors.nationalId && (
                        <p className="mt-1 text-xs text-red-600">{errors.nationalId}</p>
                    )}
                </div>
            </div>

            {/* Program Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program *
                </label>
                <select
                    name="programId"
                    value={formData.programId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 ${errors.programId ? 'border-red-500' : 'border-gray-300'
                        }`}
                    disabled={isLoading}
                >
                    <option value="">Select a program</option>
                    {PROGRAMS.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>
                {errors.programId && (
                    <p className="mt-1 text-xs text-red-600">{errors.programId}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password * (Read-only)
                </label>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition cursor-not-allowed"
                            placeholder="Generated password will appear here"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyPassword}
                        disabled={!formData.password || isLoading || isGeneratingPassword}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title="Copy password"
                    >
                        <Copy size={18} />
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
            </div>

            {/* Generate Password Button */}
            <button
                type="button"
                onClick={handleGeneratePassword}
                disabled={isLoading || isGeneratingPassword}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RefreshCw size={18} className={isGeneratingPassword ? 'animate-spin' : ''} />
                {isGeneratingPassword ? 'Generating...' : 'Generate Strong Password'}
            </button>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 bg-[#00284d] text-white rounded-lg hover:bg-[#003465] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {student ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : student ? (
                        'Update Student'
                    ) : (
                        'Create Student'
                    )}
                </button>
            </div>
        </form>
    );
}
