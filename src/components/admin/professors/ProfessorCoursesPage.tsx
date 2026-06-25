'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { getFacultyCourses } from '@/server/FacultyAction';
import { Course, CourseOffering } from '@/types';
import { useTranslations } from '@/i18n/IntlProvider';
import { extractItems } from './utils';

type FacultyCourse = Partial<Course & CourseOffering> & {
    offeringId?: string;
    courseCode?: string;
    courseTitle?: string;
    instructorName?: string;
    term?: string;
    year?: number;
};

interface ProfessorCoursesPageProps {
    professorId: string;
    professorName?: string;
}

export default function ProfessorCoursesPage({ professorId, professorName }: ProfessorCoursesPageProps) {
    const t = useTranslations('Professors');
    const tc = useTranslations('Common');
    const coursesT = useTranslations('Courses');
    const courseOfferingsT = useTranslations('CourseOfferings');

    const [courses, setCourses] = useState<FacultyCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const data = await getFacultyCourses(professorId);

                if (data && typeof data === 'object' && 'success' in data && data.success === false) {
                    setHasError(true);
                    setCourses([]);
                    toast.error(data.message || t('errorLoadCourses'));
                    return;
                }

                setCourses(extractItems<FacultyCourse>(data));
            } catch (error) {
                console.error(error);
                setHasError(true);
                setCourses([]);
                toast.error(t('errorLoadCourses'));
            } finally {
                setIsLoading(false);
            }
        };

        if (professorId) fetchCourses();
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
                    <h2 className="text-3xl font-bold text-gray-900 text-start">{t('coursesTitle')}</h2>
                    <p className="mt-1 text-gray-600 text-start">
                        {t('coursesSubtitle', { professorName: professorName || tc('na') })}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {coursesT('colCode')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {coursesT('colTitle')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {courseOfferingsT('colInstructor')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {coursesT('colCredits')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {courseOfferingsT('colTerm')}
                                </th>
                                <th className="px-6 py-3 text-start text-sm font-semibold text-gray-900">
                                    {courseOfferingsT('colYear')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        {Array.from({ length: 6 }).map((__, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : hasError ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-red-500">
                                        {t('errorLoadCourses')}
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <BookOpen size={36} className="text-gray-300" />
                                            <p className="font-medium">{t('noCourses')}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course, index) => (
                                    <tr key={course.offeringId || course.id || index} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            <span className="inline-block px-2 py-0.5 bg-gray-100 rounded font-mono text-xs">
                                                {course.courseCode || course.code || tc('na')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-start">
                                            {course.courseTitle || course.title || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {course.instructorName || course.departmentName || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {course.credits ?? tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {course.term || tc('na')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-start">
                                            {course.year || tc('na')}
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
