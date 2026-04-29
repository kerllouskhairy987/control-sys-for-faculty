/**
 * Professor Service
 * Business logic for professor operations
 */

import { Professor, PaginationInfo } from '@/types';
import {
    getProfessors,
    addProfessor as addProfessorToStore,
    updateProfessor as updateProfessorInStore,
    deleteProfessor as deleteProfessorFromStore,
} from './mockData';

export interface ProfessorFilters {
    search?: string;
    page?: number;
    limit?: number;
}

/**
 * Get all professors with filtering, searching, and pagination
 */
export function getProfessors(filters?: ProfessorFilters) {
    let results = getProfessors();

    // Apply search filter
    if (filters?.search) {
        const search = filters.search.toLowerCase();
        results = results.filter(
            (p) =>
                p.fullName.toLowerCase().includes(search) ||
                p.email.toLowerCase().includes(search) ||
                p.userName.toLowerCase().includes(search) ||
                p.specialization.toLowerCase().includes(search)
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
 * Get single professor by ID
 */
export function getProfessor(id: string): Professor | undefined {
    return getProfessors().find((p) => p.id === id);
}

/**
 * Create new professor
 */
export function createProfessor(
    professorData: Omit<Professor, 'id' | 'createdAt' | 'updatedAt'>
): Professor {
    const id = `PROF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newProfessor: Professor = {
        ...professorData,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    addProfessorToStore(newProfessor);
    return newProfessor;
}

/**
 * Update existing professor
 */
export function updateProfessor(
    id: string,
    updates: Partial<Omit<Professor, 'id' | 'createdAt'>>
): Professor | null {
    const professor = getProfessor(id);
    if (!professor) return null;

    const updatedProfessor: Professor = {
        ...professor,
        ...updates,
        updatedAt: new Date(),
    };

    updateProfessorInStore(id, updatedProfessor);
    return updatedProfessor;
}

/**
 * Delete professor
 */
export function deleteProfessor(id: string): boolean {
    const professor = getProfessor(id);
    if (!professor) return false;

    deleteProfessorFromStore(id);
    return true;
}

/**
 * Get professor statistics
 */
export function getStatistics() {
    const allProfessors = getProfessors();

    return {
        totalProfessors: allProfessors.length,
    };
}

/**
 * Check if email is already in use
 */
export function isEmailTaken(email: string, excludeId?: string): boolean {
    return getProfessors().some((p) => p.email === email && p.id !== excludeId);
}

/**
 * Search professors
 */
export function searchProfessors(query: string): Professor[] {
    const search = query.toLowerCase();
    return getProfessors().filter(
        (p) =>
            p.fullName.toLowerCase().includes(search) ||
            p.email.toLowerCase().includes(search) ||
            p.userName.toLowerCase().includes(search) ||
            p.specialization.toLowerCase().includes(search)
    );
}
