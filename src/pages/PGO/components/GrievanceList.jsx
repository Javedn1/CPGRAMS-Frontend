import React from "react";
import GrievanceCard from "./GrievanceCard";
import { FileText } from "lucide-react";

const grievances = [
    {
        id: "GRV2024001234",
        title: "Water Supply Issue in Sector 15",
        description: "Irregular water supply in our locality for the past two weeks. Residents are facing severe inconvenience during peak hours.",
        citizen: "John Doe",
        category: "Public Utilities",
        submitted: "2024-01-15",
        due: "2024-01-20",
        status: "Pending",
        priority: "High",
    },
];

const GrievanceList = () => {
    return (
        <div className="w-full px-4 sm:px-8 py-8">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1 flex justify-center items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Recent Assigned Grievances ({grievances.length})
                </h2>
                <p className="text-sm text-gray-500">Click on any complaint to view details and respond</p>
            </div>

            <div className="flex flex-col gap-6">
                {grievances.map((grievance) => (
                    <GrievanceCard key={grievance.id} grievance={grievance} />
                ))}
            </div>
        </div>
    );
};

export default GrievanceList;
