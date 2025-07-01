import React, { useState } from 'react';
import { Plus, FileText, Bell } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import FeedbackForm from '../../components/FeedbackForm';
import GrievanceDetails from '../../components/GrievanceDetails';
import MainNavbar from '../../components/header/MainHeader';
import Footer from '../../components/footer/Footer';

const statusColorMap = {
    resolved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
};

const priorityColorMap = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
};

const getStatusColor = (status) =>
    statusColorMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';

const getPriorityColor = (priority) =>
    priorityColorMap[priority?.toLowerCase()] || 'bg-gray-100 text-gray-800';

const MyGrievances = ({ complaints = [], setShowForm }) => {
    const sampleComplaints = [
        {
            id: 'GRV-1001',
            title: 'Street light not working',
            category: 'Municipal Services',
            status: 'Pending',
            priority: 'High',
            date: '2025-06-25',
            lastUpdate: '2025-06-27',
        },
        {
            id: 'GRV-1002',
            title: 'Water leakage in government building',
            category: 'Public Works Department',
            status: 'Resolved',
            priority: 'Medium',
            date: '2025-06-20',
            lastUpdate: '2025-06-28',
        },
        {
            id: 'GRV-1003',
            title: 'Delayed pension disbursement',
            category: 'Finance Department',
            status: 'Rejected',
            priority: 'Low',
            date: '2025-06-15',
            lastUpdate: '2025-06-18',
        },
    ];

    const [feedbackGrievanceId, setFeedbackGrievanceId] = useState(null);
    const [selectedGrievance, setSelectedGrievance] = useState(null);

    const openDetailsModal = (grievance) => {
        setSelectedGrievance(grievance);
    };

    const handleFeedbackSubmit = ({ grievanceId, feedback, rating }) => {
        console.log('Feedback submitted:', { grievanceId, feedback, rating });
        setFeedbackGrievanceId(null);
    };

    const openFeedbackForm = (grievanceId) => {
        setFeedbackGrievanceId(grievanceId);
    };

    const handleSendReminder = (grievanceId) => {
        console.log('Reminder sent for:', grievanceId);
        alert(`Reminder sent for grievance ID: ${grievanceId}`);
    };

    const finalComplaints = complaints.length > 0 ? complaints : sampleComplaints;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('My Grievances', 14, 16);

        const tableData = finalComplaints.map((complaint, index) => [
            index + 1,
            complaint.id,
            complaint.title,
            complaint.category,
            complaint.status,
            complaint.priority,
            complaint.date,
            complaint.lastUpdate,
        ]);

        autoTable(doc, {
            startY: 20,
            head: [[
                'S.No',
                'Grievance ID',
                'Title',
                'Category',
                'Status',
                'Priority',
                'Submitted',
                'Last Update',
            ]],
            body: tableData,
        });

        doc.save('my-grievances.pdf');
    };

    return (
        <>
            <MainNavbar />
            <div className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                        My Grievances
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg shadow"
                    >
                        <Plus className="w-4 h-4" />
                        Submit New Grievance
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md">
                    <div className="border-b px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center text-lg font-semibold text-gray-800 gap-2">
                            <FileText
                                className="w-5 h-5 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                onClick={handleDownloadPDF}
                                title="Download all grievances as PDF"
                            />
                            Grievance Records
                        </div>
                        <span className="text-sm text-gray-500">Track and manage your submitted grievances</span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm table-auto divide-y divide-gray-200">
                            <thead className="bg-gray-50 text-gray-600 font-medium">
                                <tr>
                                    <th className="p-4 text-left">Grievance ID</th>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Priority</th>
                                    <th className="p-4 text-left">Submitted</th>
                                    <th className="p-4 text-left">Last Update</th>
                                    <th className="p-4 text-left">View Details</th>
                                    <th className="p-4 text-left">Feedback</th>
                                    <th className="p-4 text-left">Remainder</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {finalComplaints.map((complaint) => (
                                    <tr key={complaint.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-mono text-xs text-gray-700">{complaint.id}</td>
                                        <td className="p-4 max-w-xs truncate text-gray-800" title={complaint.title}>
                                            {complaint.title}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {complaint.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusColor(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getPriorityColor(complaint.priority)}`}>
                                                {complaint.priority}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">{complaint.date}</td>
                                        <td className="p-4 text-gray-600">{complaint.lastUpdate}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => openDetailsModal(complaint)}
                                                className="text-indigo-600 hover:underline text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => openFeedbackForm(complaint.id)}
                                                className="text-green-600 hover:underline text-sm"
                                            >
                                                Feedback
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleSendReminder(complaint.id)}
                                                className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-sm"
                                            >
                                                <Bell className="w-4 h-4" />
                                                Remind Officer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {finalComplaints.length === 0 && (
                                    <tr>
                                        <td colSpan={10} className="p-6 text-center text-gray-500">
                                            No grievances found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {feedbackGrievanceId && (
                    <FeedbackForm
                        grievanceId={feedbackGrievanceId}
                        onClose={() => setFeedbackGrievanceId(null)}
                        onSubmit={handleFeedbackSubmit}
                    />
                )}
                {selectedGrievance && (
                    <GrievanceDetails
                        grievance={selectedGrievance}
                        onClose={() => setSelectedGrievance(null)}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyGrievances;
