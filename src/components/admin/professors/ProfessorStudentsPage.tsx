'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAdvisorStudents } from '@/server/FacultyAction';
import { Student } from '@/types';
import { useTranslations } from '@/i18n/IntlProvider';
import { getStatusBadgeClass } from '@/utils/statusBadgeColor';
import { extractItems } from './utils';

interface ProfessorStudentsPageProps {
    professorId: string;
    professorName?: string;
}

export default function ProfessorStudentsPage({ professorId, professorName }: ProfessorStudentsPageProps) {
    const t = useTranslations('Professors');
    const ts = useTranslations('Students');
    const tc = useTranslations('Common');

    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const data = await getAdvisorStudents(professorId);

                if (data && typeof data === 'object' && 'success' in data && data.success === false) {
                    setHasError(true);
                    setStudents([]);
                    toast.error(data.message || t('errorLoadStudents'));
                    return;
                }

                setStudents(extractItems<Student>(data));
            } catch (error) {
                console.error(error);
                setHasError(true);
                setStudents([]);
                toast.error(t('errorLoadStudents'));
            } finally {
                setIsLoading(false);
            }
        };

        if (professorId) fetchStudents();
    }, [professorId, t]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Link
                        href="/admin/professors"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00284d] transition mb-2 text-start"
                    >
                        <ArrowLeft size={16} />
                        {t('backToProfessors')}
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900 text-start">{t('studentsTitle')}</h2>
                    <p className="mt-1 text-gray-600 text-start">
                        {t('studentsSubtitle', { professorName: professorName || tc('na') })}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colName')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colEmail')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colAcademicNumber')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colProgram')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colCgpa')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colStatus')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {ts('colAcademicLevel')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        {Array.from({ length: 7 }).map((__, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : hasError ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-red-500">
                                        {t('errorLoadStudents')}
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Users size={36} className="text-gray-300" />
                                            <p className="font-medium">{t('noStudents')}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-start">
                                            {student.fullName || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {student.email || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {student.academicNumber || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {student.programName || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {student.cgpa !== undefined ? student.cgpa.toFixed(2) : tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-start">
                                            {student.academicStatus ? (
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(student.academicStatus)}`}>
                                                    {student.academicStatus}
                                                </span>
                                            ) : (
                                                tc('na')
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {student.academicLevel || tc('na')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
