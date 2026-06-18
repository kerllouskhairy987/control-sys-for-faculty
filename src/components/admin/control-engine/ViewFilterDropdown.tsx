'use client';

interface ViewFilterDropdownProps {
    selectedView: 'warnings' | 'graduates';
    onViewChange: (view: 'warnings' | 'graduates') => void;
    isLoading: boolean;
}

export function ViewFilterDropdown({
    selectedView,
    onViewChange,
    isLoading,
}: ViewFilterDropdownProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden p-6 border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
                View
            </label>
            <select
                value={selectedView}
                onChange={(e) => onViewChange(e.target.value as 'warnings' | 'graduates')}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00284d] focus:border-transparent disabled:opacity-50 transition"
            >
                <option value="warnings">Warnings Students</option>
                <option value="graduates">Graduates Students</option>
            </select>
        </div>
    );
}
