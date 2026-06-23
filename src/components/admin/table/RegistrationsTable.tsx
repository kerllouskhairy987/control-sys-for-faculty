'use client';

import { Registration } from '@/types';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { useTranslations } from '@/i18n/IntlProvider';

interface RegistrationsTableProps {
    data: Registration[] | null;
    isLoading: boolean;
    onApprove: (registration: Registration) => void;
    onDrop: (registration: Registration) => void;
    onWithdraw: (registration: Registration) => void;
}

const COLUMN_COUNT = 6;

export function RegistrationsTable({
    data,
    isLoading,
    onApprove,
    onDrop,
    onWithdraw,
}: RegistrationsTableProps) {
    const t = useTranslations('Registrations');

    function StatusBadge({ status }: { status: string }) {
        const styles: Record<string, string> = {
            Pending: 'bg-yellow-100 text-yellow-700',
            Approved: 'bg-green-100 text-green-700',
            Dropped: 'bg-red-100 text-red-700',
            Withdrawn: 'bg-gray-100 text-gray-600',
        };
        const cls = styles[status] ?? 'bg-gray-100 text-gray-600';

        const getStatusTranslation = (val: string) => {
            switch (val) {
                case 'Pending':
                    return t('statusPending');
                case 'Approved':
                    return t('statusApproved');
                case 'Dropped':
                    return t('statusDropped');
                case 'Withdrawn':
                    return t('statusWithdrawn');
                default:
                    return val;
            }
        };

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cls}`}>
                {getStatusTranslation(status)}
            </span>
        );
    }

    const getSemesterTranslation = (semester: string) => {
        switch (semester) {
            case 'Fall':
                return t('semesterFall');
            case 'Spring':
                return t('semesterSpring');
            case 'Summer':
                return t('semesterSummer');
            default:
                return semester;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colStudent')}
                            </th>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colCourse')}
                            </th>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colStatus')}
                            </th>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colSemester')}
                            </th>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colYear')}
                            </th>
                            <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                {t('colActions')}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-6 w-20 bg-gray-200 rounded-full" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-gray-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-12 bg-gray-200 rounded" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                                            <div className="h-8 w-16 bg-gray-200 rounded-lg" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : !data || data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={COLUMN_COUNT}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    {t('noRegistrations')}
                                </td>
                            </tr>
                        ) : (
                            data.map((registration) => (
                                <tr
                                    key={registration.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-start">
                                        {registration.studentName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                        {registration.courseTitle}{' '}
                                        {registration.courseCode
                                            ? `(${registration.courseCode})`
                                            : ''}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-start">
                                        <StatusBadge status={registration.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                        {getSemesterTranslation(registration.semester)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                        {registration.year}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-start">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {registration.status === 'Pending' && (
                                                <button
                                                    onClick={() => onApprove(registration)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-xs font-medium whitespace-nowrap"
                                                >
                                                    <CheckCircle size={14} />
                                                    {t('btnApprove')}
                                                </button>
                                            )}
                                            {registration.status === 'Approved' && (
                                                <>
                                                    <button
                                                        onClick={() => onDrop(registration)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-medium whitespace-nowrap"
                                                    >
                                                        <XCircle size={14} />
                                                        {t('btnDrop')}
                                                    </button>
                                                    <button
                                                        onClick={() => onWithdraw(registration)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-xs font-medium whitespace-nowrap"
                                                    >
                                                        <MinusCircle size={14} />
                                                        {t('btnWithdraw')}
                                                    </button>
                                                </>
                                            )}
                                            {(registration.status === 'Dropped' ||
                                                registration.status === 'Withdrawn') && (
                                                <span className="text-xs text-gray-400 italic">
                                                    {t('noActions')}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
