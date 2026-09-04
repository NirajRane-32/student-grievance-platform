import React, { useEffect, useState } from 'react';
import { dashboardAPI, complaintAPI } from '../services/api';
import { subscribeToUpdates } from '../services/socket';
import Sidebar from '../components/AdminDashboard/Sidebar';
import TopNavbar from '../components/AdminDashboard/TopNavbar';
import StatCards from '../components/AdminDashboard/StatCards';
import FiltersRow from '../components/AdminDashboard/FiltersRow';
import ActionBanners from '../components/AdminDashboard/ActionBanners';
import CategoriesChart from '../components/AdminDashboard/CategoriesChart';
import ResolutionDonut from '../components/AdminDashboard/ResolutionDonut';
import CrimeAndSafety from '../components/AdminDashboard/CrimeAndSafety';
import ComplaintsTimeline from '../components/AdminDashboard/ComplaintsTimeline';
import CollegeTable from '../components/AdminDashboard/CollegeTable';
import RecentGrievances from '../components/AdminDashboard/RecentGrievances';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    category: 'all',
    college: 'all',
    location: 'all',
    status: 'all',
    priority: 'all',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    subscribeToUpdates((data) => {
      console.log('Live Update:', data);
      fetchDashboardData();
    });
  }, [filters]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, complaintsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getAllComplaints(),
      ]);
      setStats(statsRes.data);
      setComplaints(complaintsRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: '30d',
      category: 'all',
      college: 'all',
      location: 'all',
      status: 'all',
      priority: 'all',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-6 max-w-[1540px] w-full mx-auto">
            {/* Title & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="bg-slate-900 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                    Statutory Intelligence
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    AY 2024-25 • Maharashtra Universities Act Sec. 57
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Grievance Analytics
                </h1>
                <p className="text-xs font-normal text-slate-500 mt-1">
                  Monitor complaints, safety incidents and resolution progress across affiliated colleges.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs">
                  📥 Export Audit Dossier
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition shadow-sm">
                  ⚖️ Ombudsman Session
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {stats && (
              <>
                {/* Filters */}
                <FiltersRow onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} filters={filters} />

                {/* Stat Cards */}
                <StatCards stats={stats} />

                {/* Action Banners */}
                <ActionBanners stats={stats} />

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7">
                    <CategoriesChart data={stats.categoryBreakdown} />
                  </div>
                  <div className="lg:col-span-5">
                    <ResolutionDonut stats={stats} />
                  </div>
                </div>

                {/* Crime & Safety */}
                <CrimeAndSafety stats={stats} complaints={complaints} />

                {/* Timeline Chart */}
                <ComplaintsTimeline />

                {/* Bottom Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-5">
                    <CollegeTable stats={stats} />
                  </div>
                  <div className="lg:col-span-7">
                    <RecentGrievances complaints={complaints} />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
