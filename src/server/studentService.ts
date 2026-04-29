/**
 * Student Service
 * Business logic for student operations
 */

import {
    Student,
    StudentFilters,
    StudentStatistics,
    PaginationInfo,
    StudentStatus,
} from '@/types';
import {
    getStudents,
    addStudent as addStudentToStore,
    updateStudent as updateStudentInStore,
    deleteStudent as deleteStudentFromStore,
    PROGRAMS,
    determineStatus,
} from './mockData';

/**
 * Get all students with filtering, searching, and pagination
 */
export function getStudentsFiltered(filters?: StudentFilters) {
    let results = getStudents();

    // Apply status filter
    if (filters?.status) {
        results = results.filter((s) => s.status === filters.status);
    }

    // Apply search filter
    if (filters?.search) {
        const search = filters.search.toLowerCase();
        results = results.filter(
            (s) =>
                s.fullName.toLowerCase().includes(search) ||
                s.email.toLowerCase().includes(search) ||
                s.academicNumber.toLowerCase().includes(search) ||
                s.userName.toLowerCase().includes(search)
        );
    }

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + limit);

    const pagination: PaginationInfo = {
        page,
        limit,
        total: results.length,
        totalPages: Math.ceil(results.length / limit),
    };

    return {
        data: paginatedResults,
        pagination,
    };
}

/**
 * Get single student by ID
 */
export function getStudent(id: string): Student | undefined {
    return getStudents().find((s) => s.id === id);
}

/**
 * Create new student
 */
export function createStudent(studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Student {
    const id = `STU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const status = determineStatus(3.0); // Default to active for new students

    const newStudent: Student = {
        ...studentData,
        id,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    addStudentToStore(newStudent);
    return newStudent;
}

/**
 * Update existing student
 */
export function updateStudent(id: string, updates: Partial<Omit<Student, 'id' | 'createdAt'>>): Student | null {
    const student = getStudent(id);
    if (!student) return null;

    // Recalculate status if GPA is updated
    let status = student.status;
    if (updates.gpa !== undefined) {
        status = determineStatus(updates.gpa);
    }

    const updatedStudent: Student = {
        ...student,
        ...updates,
        status,
        updatedAt: new Date(),
    };

    updateStudentInStore(id, updatedStudent);
    return updatedStudent;
}

/**
 * Delete student
 */
export function deleteStudent(id: string): boolean {
    const student = getStudent(id);
    if (!student) return false;

    deleteStudentFromStore(id);
    return true;
}

/**
 * Get student statistics
 */
export function getStatistics(): StudentStatistics {
    const allStudents = getStudents();

    const activeStudents = allStudents.filter((s) => s.status === 'Active').length;
    const warningStudents = allStudents.filter((s) => s.status === 'Warning').length;
    const dismissedStudents = allStudents.filter((s) => s.status === 'Dismissed').length;

    const averageGPA =
        allStudents.length > 0
            ? parseFloat(
                (allStudents.reduce((sum, s) => sum + s.gpa, 0) / allStudents.length).toFixed(2)
            )
            : 0;

    return {
        totalStudents: allStudents.length,
        activeStudents,
        warningStudents,
        dismissedStudents,
        averageGPA,
    };
}

/**
 * Get program name by ID
 */
export function getProgramName(programId: string): string {
    const program = PROGRAMS.find((p) => p.id === programId);
    return program?.name || 'Unknown Program';
}

/**
 * Check if email is already in use
 */
export function isEmailTaken(email: string, excludeId?: string): boolean {
    return getStudents().some((s) => s.email === email && s.id !== excludeId);
}

/**
 * Check if academic number is already in use
 */
export function isAcademicNumberTaken(academicNumber: string, excludeId?: string): boolean {
    return getStudents().some((s) => s.academicNumber === academicNumber && s.id !== excludeId);
}

/**
 * Search students
 */
export function searchStudents(query: string): Student[] {
    const search = query.toLowerCase();
    return getStudents().filter(
        (s) =>
            s.fullName.toLowerCase().includes(search) ||
            s.email.toLowerCase().includes(search) ||
            s.academicNumber.toLowerCase().includes(search) ||
            s.userName.toLowerCase().includes(search)
    );
}
