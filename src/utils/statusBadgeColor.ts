/**
 * Status Badge Color Mapping
 */

import { StudentStatus } from '@/types';

interface StatusColorMap {
    bg: string;
    text: string;
    border: string;
    badge: string;
}

export function getStatusColors(status: StudentStatus): StatusColorMap {
    const colorMap: Record<StudentStatus, StatusColorMap> = {
        Active: {
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200',
            badge: 'bg-green-100 text-green-800',
        },
        Warning: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            badge: 'bg-yellow-100 text-yellow-800',
        },
        Dismissed: {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            badge: 'bg-red-100 text-red-800',
        },
    };

    return colorMap[status];
}

export function getStatusBadgeClass(status: StudentStatus): string {
    return getStatusColors(status).badge;
}

export function getStatusTextClass(status: StudentStatus): string {
    return getStatusColors(status).text;
}

export function getStatusBgClass(status: StudentStatus): string {
    return getStatusColors(status).bg;
}

/**
 * Get status color for chart purposes
 */
export function getStatusChartColor(status: StudentStatus): string {
    const colors: Record<StudentStatus, string> = {
        Active: '#10b981',     // green
        Warning: '#f59e0b',    // amber
        Dismissed: '#ef4444',  // red
    };
    return colors[status];
}
