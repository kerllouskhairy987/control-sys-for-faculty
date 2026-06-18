'use client';

import { WarningStudent, GraduationCandidate } from '@/types';

interface ControlEngineTableProps {
    data: WarningStudent[] | GraduationCandidate[] | null;
    selectedView: 'warnings' | 'graduates';
    isLoading: boolean;
}

function isWarningStudent(item: WarningStudent | GraduationCandidate): item is WarningStudent {
    return 'consecutiveWarnings' in item;
}

export function ControlEngineTable({
    data,
    selectedView,
    isLoading,
}: ControlEngineTableProps) {
    const skeletonRows = Array.from({ length: 8 });

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                {selectedView === 'warnings' ? (
                                    <>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Academic Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Student Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Program Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            CGPA
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Consecutive Warnings
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Academic Status
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Academic Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Student Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Program Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            CGPA
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Earned / Required
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Eligible
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Missing Requirements
                                        </th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {skeletonRows.map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    {selectedView === 'warnings' ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-40 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-16 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-12 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-40 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-16 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-6 w-12 bg-gray-200 rounded-full" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-8 text-center text-gray-500">
                    <p>No {selectedView === 'warnings' ? 'warnings' : 'graduates'} found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {selectedView === 'warnings' ? (
                                <>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Academic Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Student Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Program Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        CGPA
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Consecutive Warnings
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Academic Status
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Academic Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Student Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Program Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        CGPA
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Earned / Required
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Eligible
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                        Missing Requirements
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {selectedView === 'warnings'
                            ? (data as WarningStudent[]).map((student) => (
                                <tr key={student.studentId} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {student.academicNumber}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {student.studentName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.programName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.cgpa.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.consecutiveWarnings}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${student.academicStatus === 'Dismissed'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-amber-100 text-amber-800'
                                                }`}
                                        >
                                            {student.academicStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                            : (data as GraduationCandidate[]).map((student) => (
                                <tr key={student.studentId} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {student.academicNumber}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {student.studentName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.programName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.cgpa.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {student.earnedCredits} / {student.requiredCredits}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${student.isEligible
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {student.isEligible ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {student.missingRequirements && student.missingRequirements.length > 0 ? (
                                                student.missingRequirements.map((req, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                                    >
                                                        {req}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs">—</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}