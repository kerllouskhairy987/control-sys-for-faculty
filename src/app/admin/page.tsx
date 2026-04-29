import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { StudentDistributionChart } from '@/components/admin/charts/StudentDistributionChart';
import { GpaDistributionChart } from '@/components/admin/charts/GpaDistributionChart';

export default async function AdminPage() {
// await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate loading delay
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome to SIS Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">
          Manage students, professors, and view system statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Statistics</h3>
        <DashboardStats />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentDistributionChart />
        <GpaDistributionChart />
      </div>
    </div>
  );
}
