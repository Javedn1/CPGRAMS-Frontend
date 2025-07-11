import React, { useState, useMemo } from 'react';

const Reminder = () => {
    const reminders = [
        {
            id: 1,
            complaintId: "CMP12345",
            userName: "Rahul Verma",
            title: "Reminder: Unresolved Complaint",
            description: "It's been 5 days, and I haven’t received any update on my issue.",
            reminderDate: "2025-07-04T12:00:00",
            repeat: "One-time",
            createdAt: "2025-06-29T14:30:00",
            status: "Pending",
            priority: "High"
        },
        {
            id: 2,
            complaintId: "CMP12346",
            userName: "Anita Singh",
            title: "Reminder: No Action Taken",
            description: "Please update me on my complaint regarding street lights.",
            reminderDate: "2025-07-05T10:00:00",
            repeat: "One-time",
            createdAt: "2025-06-30T16:45:00",
            status: "Pending",
            priority: "Medium"
        }
    ];

    const [selectedReminder, setSelectedReminder] = useState(reminders[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    const filteredReminders = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        let sorted = [...reminders].filter(
            r =>
                r.complaintId.toLowerCase().includes(searchLower) ||
                r.userName.toLowerCase().includes(searchLower)
        );

        sorted.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return sorted;
    }, [searchTerm, sortOrder, reminders]);

    return (
        <div className="px-6 py-4 min-h-screen">
            
            <div className="flex flex-col md:flex-row bg-gray-200 justify-between gap-4 mb-6 p-2 rounded-xl shadow-sm border border-gray-200">
                <div className="bg-white rounded-md w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="🔍 Search by Complaint ID or User"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full md:w-1/3">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">📅 Newest to Oldest</option>
                        <option value="oldest">📅 Oldest to Newest</option>
                    </select>
                </div>
            </div>



            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {filteredReminders.map((reminder) => (
                    <div
                        key={reminder.id}
                        onClick={() => setSelectedReminder(reminder)}
                        className={`min-w-[280px] bg-white p-4 rounded-xl shadow-md border-l-4 cursor-pointer transition-all ${selectedReminder.id === reminder.id
                            ? 'border-blue-600'
                            : 'border-yellow-500'
                            }`}
                    >
                        <h3 className="text-md font-semibold">{reminder.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Complaint ID: <span className="text-blue-600 font-medium">#{reminder.complaintId}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">User: {reminder.userName}</p>
                        <p className="text-xs text-gray-500">Reminder Date: {new Date(reminder.reminderDate).toLocaleString()}</p>

                        <div className="mt-2 text-xs flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full ${reminder.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : reminder.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                {reminder.priority} Priority
                            </span>
                            <span className="text-yellow-700 font-medium">Status: {reminder.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedReminder && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-blue-700 mb-3">Reminder Details</h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <strong>Complaint ID:</strong> #{selectedReminder.complaintId}
                        </div>
                        <div>
                            <strong>User:</strong> {selectedReminder.userName}
                        </div>
                        <div>
                            <strong>Reminder Set On:</strong> {new Date(selectedReminder.createdAt).toLocaleString()}
                        </div>
                        <div>
                            <strong>Reminder Date:</strong> {new Date(selectedReminder.reminderDate).toLocaleString()}
                        </div>
                        <div>
                            <strong>Status:</strong> <span className="text-yellow-700 font-semibold">{selectedReminder.status}</span>
                        </div>
                        <div>
                            <strong>Priority:</strong> <span className={`font-semibold ${selectedReminder.priority === 'High'
                                ? 'text-red-600'
                                : selectedReminder.priority === 'Medium'
                                    ? 'text-yellow-600'
                                    : 'text-green-600'
                                }`}>
                                {selectedReminder.priority}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <strong>User Note:</strong>
                            <p className="mt-1 text-gray-600">{selectedReminder.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reminder;
