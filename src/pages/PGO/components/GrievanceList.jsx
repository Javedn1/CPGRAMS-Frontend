import React, { useEffect, useState, useRef } from "react";
import GrievanceCard from "./GrievanceCard";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

const grievances = [
    {
        id: "GRV2024001234",
        title: "Water Supply Issue in Sector 15",
        description:
            "Irregular water supply in our locality for the past two weeks. Residents are facing severe inconvenience during peak hours.",
        citizen: "John Doe",
        category: "Public Utilities",
        submitted: "2024-01-15",
        due: "2024-01-20",
        status: "Pending",
        priority: "High",
    },
    {
        id: "GRV2024001235",
        title: "Gas Supply Issue in Sector 20",
        description:
            "Irregular gas supply in our locality for the past two weeks. Residents are facing severe inconvenience during peak hours.",
        citizen: "Aditya Doe",
        category: "Public Utilities",
        submitted: "2024-01-18",
        due: "2024-01-22",
        status: "Pending",
        priority: "High",
    },
];

const GrievanceList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showButtons, setShowButtons] = useState(true);
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);

    // Auto-slide every 4s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % grievances.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Handle manual button click
    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? grievances.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % grievances.length);
    };

    // Detect scroll interaction
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const handleScroll = () => {
            setShowButtons(false);
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setShowButtons(true);
            }, 1000);
        };

        node.addEventListener("scroll", handleScroll);
        return () => node.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full px-4 sm:px-4 py-4">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1 flex justify-center items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Recent Assigned Grievances ({grievances.length})
                </h2>
            </div>

            <div ref={containerRef} className="relative w-full overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${grievances.length * 50}%`,
                    }}
                >
                    {grievances.map((grievance) => (
                        <div
                            key={grievance.id}
                            className="w-full flex-shrink-0"
                            style={{ width: "100%" }}
                        >
                            <GrievanceCard grievance={grievance} />
                        </div>
                    ))}
                </div>

                {showButtons && (
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                )}

                {showButtons && (
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                )}
            </div>

            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => console.log("Redirect to full grievance list")}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
                >
                    View More
                </button>
            </div>

        </div>
    );
};

export default GrievanceList;
