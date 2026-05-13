import { FacultyStatus } from "@/enums";

/**
 * @desc    jwt payload type definition
 */
export interface JwtPayload {
    sub: string;
    jti: string;
    email: string;
    uid: string;
    roles: string;
    exp: number;
    iss: string;
    aud: string;
}

/**
 * Core Type Definitions for Admin Dashboard
 */

export type StudentStatus = 'GoodStanding' | 'Dismissed' | string;
export type UserRole = 'Admin' | 'Student' | 'Professor';

/**
 * Program interface
 */
// export interface Program {
//     id: string;
//     name: string;
//     code: string;
// }

/**
 * Student interface
 */
export interface Student {
    id: string;
    userName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    fullName: string;
    academicNumber?: string;
    academicStatus?: StudentStatus;
    academicLevel?: string;
    nationalId?: string;
    programId?: string;
    programName?: string;
    gpa?: number;
    cgpa?: number;
    status?: StudentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}


/**
 * @desc    advisor interface
 */
export interface Advisor {
    id: string,
    name: string,
    degree: string,
    departmentName: string,
    email: string
}

/**
 * Department interface
 */
export interface Department {
    id?: string;
    name: string;
    description: string;
    programs?: Program[];
}

/**
 * Program interface
 */
export interface Program {
    id: string;
    name: string;
    requiredCredits: number;
    departmentName?: string;
}

/**
 * Professor interface
 */
export interface Professor {
    id: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    fullName: string;
    nationalId: string;
    departmentId: string;
    specialization: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @desc    faculty interface
 */
export interface Faculty {
    id: string;
    name: string;
    degree: string;
    departmentName: string;
    status: FacultyStatus;
}
/**
 * @desc    single faculty member interface
 */
export interface SingleFacultyMember {
    id: string;
    name: string;
    degree: string;
    departmentName: string;
    email: string;
    appUserId: string;
    status: FacultyStatus;
}

/**
 * Student Create/Update Payload
 */
export interface StudentFormData {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    fullName: string;
    academicNumber: string;
    nationalId: string;
    programId: string;
}

/**
 * Department Create/Update Payload
 */
export interface DepartmentFormData {
    name: string;
    description: string;
}

/**
 * Student Filters
 */
export interface StudentFilters {
    status?: StudentStatus;
    search?: string;
    page?: number;
    limit?: number;
}

/**
 * Statistics DTO
 */
export interface StudentStatistics {
    totalStudents: number;
    activeStudents: number;
    warningStudents: number;
    dismissedStudents: number;
    averageGPA: number;
}

/**
 * Pagination Info
 */
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

/**
 * Table state for filtering
 */
export interface TableState {
    sortBy?: keyof Student;
    sortOrder?: 'asc' | 'desc';
    page: number;
    limit: number;
    search?: string;
    filters?: StudentFilters;
}
