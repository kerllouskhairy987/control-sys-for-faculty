'use client';

import { useCallback, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Registration } from '@/types';
import Pagination from '@/components/ui/Pagination';
import { ConfirmationDialog } from '@/components/admin/modals/ConfirmationDialog';
import { RegistrationsTable } from '@/components/admin/table/RegistrationsTable';
import { ApproveRegistrationModal } from './ApproveRegistrationModal';
import { useTranslations } from '@/i18n/IntlProvider';
import {
    getAllRegistrations,
    getPendingRegistrations,
    dropRegistration,
    withdrawRegistration,
} from '@/server/Registrations';

export default function RegistrationsPage() {
    const t = useTranslations('Registrations');
    const tc = useTranslations('Common');

    const [registrationsData, setRegistrationsData] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // Filters
    const [viewMode, setViewMode] = useState<'all' | 'pending'>('all');
    const [status, setStatus] = useState('');
    const [semester, setSemester] = useState('');
    const [year, setYear] = useState<number | ''>('');

    // Approve modal
    const [approveModal, setApproveModal] = useState<{
        isOpen: boolean;
        registrationId: string | null;
        studentId: string | null;
    }>({ isOpen: false, registrationId: null, studentId: null });

    // Drop confirmation
    const [dropConfirmation, setDropConfirmation] = useState<{
        isOpen: boolean;
        registration: Registration | null;
    }>({ isOpen: false, registration: null });
    const [isDropLoading, setIsDropLoading] = useState(false);

    // Withdraw confirmation
    const [withdrawConfirmation, setWithdrawConfirmation] = useState<{
        isOpen: boolean;
        registration: Registration | null;
    }>({ isOpen: false, registration: null });
    const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

    // Fetch data
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);

            let data;
            if (viewMode === 'pending') {
                data = await getPendingRegistrations();
            } else {
                data = await getAllRegistrations({
                    status: status || undefined,
                    semester: semester || undefined,
                    year: year ? Number(year) : undefined,
                    page,
                    pageSize,
                });
            }

            if (data) {
                // Handle both paginated and flat array responses
                if (Array.isArray(data)) {
                    setRegistrationsData(data);
                    setTotalCount(data.length);
                    setTotalPages(1);
                } else {
                    setRegistrationsData(data.items || []);
                    setTotalPages(data.totalPages || 1);
                    setTotalCount(data.totalCount || 0);
                }
            } else {
                setRegistrationsData([]);
                setTotalCount(0);
            }
        } catch (error) {
            console.error(error);
            toast.error(tc('error'));
        } finally {
            setIsLoading(false);
        }
    }, [viewMode, status, semester, year, page, pageSize, tc]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handlers
    const handleApprove = (registration: Registration) => {
        setApproveModal({
            isOpen: true,
            registrationId: registration.id,
            studentId: registration.studentId,
        });
    };

    const handleDrop = (registration: Registration) => {
        setDropConfirmation({ isOpen: true, registration });
    };

    const handleWithdraw = (registration: Registration) => {
        setWithdrawConfirmation({ isOpen: true, registration });
    };

    const handleConfirmDrop = async () => {
        if (!dropConfirmation.registration) return;
        setIsDropLoading(true);
        try {
            const res = await dropRegistration(
                dropConfirmation.registration.id,
                dropConfirmation.registration.studentId
            );
            if (res.success) {
                toast.success(res.message);
                fetchData();
            } else {
                toast.error(res.message || tc('error'));
            }
        } catch (error) {
            console.error(error);
            toast.error(tc('error'));
        } finally {
            setIsDropLoading(false);
            setDropConfirmation({ isOpen: false, registration: null });
        }
    };

    const handleConfirmWithdraw = async () => {
        if (!withdrawConfirmation.registration) return;
        setIsWithdrawLoading(true);
        try {
            const res = await withdrawRegistration(
                withdrawConfirmation.registration.id,
                withdrawConfirmation.registration.studentId
            );
            if (res.success) {
                toast.success(res.message);
                fetchData();
            } else {
                toast.error(res.message || tc('error'));
            }
        } catch (error) {
            console.error(error);
            toast.error(tc('error'));
        } finally {
            setIsWithdrawLoading(false);
            setWithdrawConfirmation({ isOpen: false, registration: null });
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-start">
                    <h2 className="text-3xl font-bold text-gray-900">{t('title')}</h2>
                    <p className="mt-1 text-gray-600">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 text-start">{t('filters')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* View Mode Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">
                            {t('labelView')}
                        </label>
                        <select
                            value={viewMode}
                            onChange={(e) => {
                                setViewMode(e.target.value as 'all' | 'pending');
                                setPage(1);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition text-start"
                        >
                            <option value="all">{t('optionAll')}</option>
                            <option value="pending">{t('optionPending')}</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">
                            {t('labelStatus')}
                        </label>
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            disabled={viewMode === 'pending'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-start"
                        >
                            <option value="">{t('allStatuses')}</option>
                            <option value="Pending">{t('statusPending')}</option>
                            <option value="Approved">{t('statusApproved')}</option>
                            <option value="Dropped">{t('statusDropped')}</option>
                            <option value="Withdrawn">{t('statusWithdrawn')}</option>
                        </select>
                    </div>

                    {/* Semester Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">
                            {t('labelSemester')}
                        </label>
                        <select
                            value={semester}
                            onChange={(e) => {
                                setSemester(e.target.value);
                                setPage(1);
                            }}
                            disabled={viewMode === 'pending'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-start"
                        >
                            <option value="">{t('allSemesters')}</option>
                            <option value="Fall">{t('semesterFall')}</option>
                            <option value="Spring">{t('semesterSpring')}</option>
                            <option value="Summer">{t('semesterSummer')}</option>
                        </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-start">
                            {t('labelYear')}
                        </label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => {
                                setYear(e.target.value ? parseInt(e.target.value) : '');
                                setPage(1);
                            }}
                            disabled={viewMode === 'pending'}
                            min="1900"
                            max="2100"
                            placeholder={t('allYears')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00284d] focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed text-start"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <RegistrationsTable
                data={registrationsData}
                isLoading={isLoading}
                onApprove={handleApprove}
                onDrop={handleDrop}
                onWithdraw={handleWithdraw}
            />

            {/* Pagination */}
            {!isLoading && registrationsData.length > 0 && viewMode === 'all' && (
                <Pagination
                    totalCount={totalCount}
                    currentPage={page}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                />
            )}

            {/* Approve Modal */}
            <ApproveRegistrationModal
                isOpen={approveModal.isOpen}
                registrationId={approveModal.registrationId}
                studentId={approveModal.studentId}
                onClose={() =>
                    setApproveModal({ isOpen: false, registrationId: null, studentId: null })
                }
                onSuccess={() => {
                    setApproveModal({ isOpen: false, registrationId: null, studentId: null });
                    fetchData();
                }}
            />

            {/* Drop Confirmation */}
            <ConfirmationDialog
                isOpen={dropConfirmation.isOpen}
                title={t('dropTitle')}
                message={
                    <>
                        {t('dropMessage', {
                            student: dropConfirmation.registration?.studentName ?? '',
                            course: dropConfirmation.registration?.courseTitle ?? '',
                        })}
                    </>
                }
                isLoading={isDropLoading}
                confirmText={t('btnDrop')}
                cancelText={tc('cancel')}
                isDangerous={true}
                onConfirm={handleConfirmDrop}
                onCancel={() => setDropConfirmation({ isOpen: false, registration: null })}
            />

            {/* Withdraw Confirmation */}
            <ConfirmationDialog
                isOpen={withdrawConfirmation.isOpen}
                title={t('withdrawTitle')}
                message={
                    <>
                        {t('withdrawMessage', {
                            student: withdrawConfirmation.registration?.studentName ?? '',
                            course: withdrawConfirmation.registration?.courseTitle ?? '',
                        })}
                    </>
                }
                isLoading={isWithdrawLoading}
                confirmText={t('btnWithdraw')}
                cancelText={tc('cancel')}
                isDangerous={false}
                onConfirm={handleConfirmWithdraw}
                onCancel={() => setWithdrawConfirmation({ isOpen: false, registration: null })}
            />
        </div>
    );
}
