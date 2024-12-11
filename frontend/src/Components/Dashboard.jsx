import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const location = useLocation();
  const { email, username } = location.state || {};
  const Email = localStorage.getItem("Email");
  const Username = localStorage.getItem("Username");
  console.log("email", Email);
  console.log("username", Username);

  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('dateApplied');
  const [search, setSearch] = useState('');
  const [newJob, setNewJob] = useState({ title: '', company: '', status: 'Applied', dateApplied: '', notes: '' });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = { status: statusFilter, sort: sortBy, search: search };
      const { data } = await axios.get('http://localhost:5000/api/jobs', { params });
      setJobs(data.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, sortBy, search]);

  // Handle job deletion
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle job creation
  const handleCreate = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/jobs', newJob);
      setNewJob({ title: '', company: '', status: 'Applied', dateApplied: '', notes: '' });
      setAddModalOpen(false);
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle job update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/jobs/${currentJob._id}`, currentJob);
      setCurrentJob(null);
      setEditModalOpen(false);
      fetchJobs();
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>

      {/* Filters and Sorting */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="dateApplied">Date Applied</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
        </select>
      </div>

      {/* Add Job Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => setAddModalOpen(true)}
      >
        Add New Job
      </button>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Job Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date Applied</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 && !loading ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                There is no jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job._id}>
                <td className="border p-2 ">{job.title}</td>
                <td className="border p-2 ">{job.company}</td>
                <td className="border p-2 ">{job.status}</td>
                <td className="border p-2 ">{new Date(job.dateApplied).toLocaleDateString()}</td>
                <td className="border p-2 ">{job.notes}</td>
                <td className="border p-2 flex justify-center items-center">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setCurrentJob(job);
                      setEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add and Edit Modals (unchanged, omitted for brevity) */}
       {/* Add Job Modal */}
       {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Job</h2>
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={newJob.status}
              onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={newJob.dateApplied}
              onChange={(e) => setNewJob({ ...newJob, dateApplied: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Notes"
              value={newJob.notes}
              onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 py-2 px-4 rounded mr-2"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleCreate}
              >
                Add Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && currentJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <input
              type="text"
              placeholder="Job Title"
              value={currentJob.title}
              onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={currentJob.company}
              onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              value={currentJob.status}
              onChange={(e) => setCurrentJob({ ...currentJob, status: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={currentJob.dateApplied}
              onChange={(e) => setCurrentJob({ ...currentJob, dateApplied: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Notes"
              value={currentJob.notes}
              onChange={(e) => setCurrentJob({ ...currentJob, notes: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 py-2 px-4 rounded mr-2"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
