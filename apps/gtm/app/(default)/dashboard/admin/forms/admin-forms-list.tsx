'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';

interface Submission {
  id: string;
  formSlug: string;
  email: string;
  name: string | null;
  score: number | null;
  status: string;
  createdAt: string;
}

interface AdminFormsListProps {
  adminSecret: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  reviewed: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  qualified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  contacted: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

const formSlugs = Object.keys(FORM_DEFINITIONS);

export default function AdminFormsList({ adminSecret }: AdminFormsListProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterSlug, setFilterSlug] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const pageSize = 20;

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if (filterSlug) params.set('slug', filterSlug);
      if (filterStatus) params.set('status', filterStatus);

      const res = await fetch(`/api/admin/forms?${params}`, {
        headers: { Authorization: `Bearer ${adminSecret}` },
      });
      const data = await res.json();
      setSubmissions(data.submissions || []);
      setTotal(data.total || 0);
    } catch {
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [page, filterSlug, filterStatus, adminSecret]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleExport = () => {
    if (!filterSlug) return;
    const params = new URLSearchParams({ slug: filterSlug, secret: adminSecret });
    if (filterStatus) params.set('status', filterStatus);
    window.open(`/api/admin/forms/export?${params}`, '_blank');
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Form Submissions
        </h1>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleExport}
            disabled={!filterSlug}
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="form-select"
          value={filterSlug}
          onChange={(e) => { setFilterSlug(e.target.value); setPage(1); }}
        >
          <option value="">All Forms</option>
          {formSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {FORM_DEFINITIONS[slug].title}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="qualified">Qualified</option>
          <option value="rejected">Rejected</option>
          <option value="contacted">Contacted</option>
        </select>

        <span className="self-center text-sm text-gray-500 dark:text-gray-400">
          {total} submission{total !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap text-left">Date</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">Form</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">Name</th>
                <th className="px-4 py-3 whitespace-nowrap text-left">Email</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Score</th>
                <th className="px-4 py-3 whitespace-nowrap text-center">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No submissions found</td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/20">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        {sub.formSlug}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {sub.name || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
                      {sub.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      {sub.score !== null ? (
                        <span className="font-semibold">{sub.score}</span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[sub.status] || ''}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Link
                        href={`/dashboard/admin/forms/${sub.id}`}
                        className="text-sm font-medium text-primary-500 hover:text-primary-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
