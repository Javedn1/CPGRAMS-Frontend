import React, { useEffect, useState } from 'react';
import {
    Home,
    Users,
    FolderOpen,
    Calendar,
    FileText,
    BarChart3,
    Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleNavbar = () => setIsOpen(!isOpen);


    useEffect(() => {
        if (location.pathname.includes('team')) setActiveNav('Team');
        else if (location.pathname.includes('projects')) setActiveNav('Projects');
        else if (location.pathname.includes('calendar')) setActiveNav('Calendar');
        else if (location.pathname.includes('documents')) setActiveNav('Documents');
        else if (location.pathname.includes('reports')) setActiveNav('Reports');
        else setActiveNav('Dashboard');
    }, [location.pathname]);
    
    return (
        <>
            {/* NAVBAR */}
            <nav className="sm:hidden bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                    <a href="#" className="flex items-center space-x-3">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsPJ9cm0-r5p50py0yUzvM5ZtEB-xWoJRPRA&s"
                            className="h-8"
                            alt="Logo"
                        />
                        <span className="text-md font-semibold dark:text-white">Netfotech Solutions</span>
                    </a>
                    <button
                        onClick={toggleNavbar}
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}

                    </button>
                </div>

                {isOpen && (
                    <div id="mobile-menu" className="px-4 pb-4">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <button
                                    onClick={() => setActiveNav('Dashboard')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Dashboard'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Home className="w-5 h-5 mr-2" />
                                    <Link to="/PGO-Dashboard">
                                        Dashboard
                                    </Link>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveNav('Team')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Team'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Users className="w-5 h-5 mr-2" />
                                    <Link to="team">
                                        Team
                                    </Link>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveNav('Projects')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Projects'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <FolderOpen className="w-5 h-5 mr-2" />
                                    <Link to="projects">
                                        Projects
                                    </Link>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveNav('Calendar')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Calendar'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Calendar
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveNav('Documents')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Documents'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Documents
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveNav('Reports')}
                                    className={`flex items-center w-full py-2 px-3 rounded-md ${activeNav === 'Reports'
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    Reports
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            {/* SIDEBAR */}
            <div className="hidden sm:flex w-44 bg-white shadow-[4px_0px_6px_0px_rgba(0,_0,_0,_0.2)] border-r border-gray-200 h-[118vh] flex-col absolute  left-0 top-0">
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                        <div className="ml-3 overflow-hidden">
                            <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                Netfotech Solutions
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-3 py-4 overflow-y-auto">
                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveNav('Dashboard')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Dashboard'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <Home className="w-5 h-5 mr-3 flex-shrink-0" />
                            <Link to="/PGO-Dashboard">
                                <span className="truncate">Dashboard</span>
                            </Link>
                        </button>

                        <button
                            onClick={() => setActiveNav('Team')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Team'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                            <Link to="team">
                                <span className="truncate">Team</span>
                            </Link>
                        </button>

                        <button
                            onClick={() => setActiveNav('Projects')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Projects'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <FolderOpen className="w-5 h-5 mr-3 flex-shrink-0" />
                            <Link to="ofc-com">
                                <span className="truncate">Grievance</span>
                            </Link>
                        </button>

                        <button
                            onClick={() => setActiveNav('Calendar')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Calendar'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className="truncate">Calendar</span>
                        </button>

                        <button
                            onClick={() => setActiveNav('Documents')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Documents'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <FileText className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className="truncate">Documents</span>
                        </button>

                        <button
                            onClick={() => setActiveNav('Reports')}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeNav === 'Reports'
                                ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                }`}
                        >
                            <BarChart3 className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className="truncate">Reports</span>
                        </button>
                    </nav>
                </div>

                {/* <div className="p-3 border-t border-gray-100">
                    <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
                        <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="truncate">Settings</span>
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default Sidebar;
