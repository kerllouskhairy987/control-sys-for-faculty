/**
 * Server Actions for Student Operations
 * These run on the server and handle CRUD operations
 */

'use server';

import { Student, StudentFormData } from '@/types';
import * as studentService from './studentService';
import { generatePassword } from '@/utils/passwordGenerator';

/**
 * Get all students with filters
 */
export async function getStudentsAction(
    page: number = 1,
    search?: string,
    status?: string,
    limit: number = 10
) {
    try {
        const result = studentService.getStudentsFiltered({
            page,
            limit,
            search,
            status: status as any,
        });

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch students',
        };
    }
}

/**
 * Get single student by ID
 */
export async function getStudentAction(id: string) {
    try {
        const student = studentService.getStudent(id);

        if (!student) {
            return {
                success: false,
                error: 'Student not found',
            };
        }

        return {
            success: true,
            data: student,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch student',
        };
    }
}

/**
 * Create new student
 */
export async function createStudentAction(formData: StudentFormData) {
    try {
        // Validate email is not in use
        if (studentService.isEmailTaken(formData.email)) {
            return {
                success: false,
                error: 'Email is already in use',
            };
        }

        // Validate academic number is not in use
        if (studentService.isAcademicNumberTaken(formData.academicNumber)) {
            return {
                success: false,
                error: 'Academic number is already in use',
            };
        }

        // Create student
        const student = studentService.createStudent({
            ...formData,
            gpa: 3.0, // Default GPA for new students
        });

        return {
            success: true,
            message: 'Student added successfully',
            data: student,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to create student',
        };
    }
}

/**
 * Update existing student
 */
export async function updateStudentAction(id: string, updates: Partial<StudentFormData>) {
    try {
        // Check if student exists
        const existingStudent = studentService.getStudent(id);
        if (!existingStudent) {
            return {
                success: false,
                error: 'Student not found',
            };
        }

        // Validate email is not taken by another student
        if (updates.email && updates.email !== existingStudent.email) {
            if (studentService.isEmailTaken(updates.email, id)) {
                return {
                    success: false,
                    error: 'Email is already in use',
                };
            }
        }

        // Validate academic number is not taken by another student
        if (updates.academicNumber && updates.academicNumber !== existingStudent.academicNumber) {
            if (studentService.isAcademicNumberTaken(updates.academicNumber, id)) {
                return {
                    success: false,
                    error: 'Academic number is already in use',
                };
            }
        }

        // Update student
        const updated = studentService.updateStudent(id, updates);

        if (!updated) {
            return {
                success: false,
                error: 'Failed to update student',
            };
        }

        return {
            success: true,
            message: 'Student updated successfully',
            data: updated,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to update student',
        };
    }
}

/**
 * Delete student
 */
export async function deleteStudentAction(id: string) {
    try {
        const success = studentService.deleteStudent(id);

        if (!success) {
            return {
                success: false,
                error: 'Student not found',
            };
        }

        return {
            success: true,
            message: 'Student deleted successfully',
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to delete student',
        };
    }
}

/**
 * Get student statistics
 */
export async function getStudentStatisticsAction() {
    try {
        const stats = studentService.getStatistics();

        return {
            success: true,
            data: stats,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch statistics',
        };
    }
}

/**
 * Generate a strong password
 */
export async function generatePasswordAction() {
    try {
        const password = generatePassword();

        return {
            success: true,
            data: {
                password,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to generate password',
        };
    }
}

/**
 * Search students
 */
export async function searchStudentsAction(query: string) {
    try {
        const results = studentService.searchStudents(query);

        return {
            success: true,
            data: results,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to search students',
        };
    }
}
