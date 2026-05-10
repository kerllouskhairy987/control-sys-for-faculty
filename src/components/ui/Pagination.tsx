import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
}: PaginationProps) {
    const generatePages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

            {/* Page Size */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>

                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-xl bg-white text-sm outline-none focus:ring-2 focus:ring-[#00284d]"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 flex-wrap">

                {/* Previous */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Pages */}
                {generatePages().map((page, index) =>
                    page === "..." ? (
                        <span
                            key={index}
                            className="w-10 h-10 flex items-center justify-center text-gray-500"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => onPageChange(Number(page))}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition shadow-sm
                ${currentPage === page
                                    ? "bg-[#00284d] text-white"
                                    : "bg-white border border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 bg-white shadow-sm hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}