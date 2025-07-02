import React, { useState } from 'react';
import {
    Home,
    Users,
    FolderOpen,
    Calendar,
    FileText,
    BarChart3,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    const navItems = [
        { icon: Home, label: 'Dashboard' },
        { icon: Users, label: 'Team' },
        { icon: FolderOpen, label: 'Projects' },
        { icon: Calendar, label: 'Calendar' },
        { icon: FileText, label: 'Documents' },
        { icon: BarChart3, label: 'Reports' },
    ];

    return (
        <>
            {/* NAVBAR */}
            <nav className="sm:hidden bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                    <a href="#" className="flex items-center space-x-3">
                        <img
                            src=""
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
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 17 14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div id="mobile-menu" className="px-4 pb-4">
                        <ul className="space-y-2 font-medium">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = activeNav === item.label;

                                return (
                                    <li key={index}>
                                        <button
                                            onClick={() => setActiveNav(item.label)}
                                            className={`flex items-center w-full py-2 px-3 rounded-md ${
                                                isActive
                                                    ? "text-white bg-blue-700 dark:bg-blue-600"
                                                    : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            <Icon className="w-5 h-5 mr-2" />
                                            {item.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>

            {/* SIDEBAR */}
            <div className="hidden sm:flex w-44 bg-white shadow-[4px_0px_6px_0px_rgba(0,_0,_0,_0.2)] border-r border-gray-200 h-screen flex-col">
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
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = activeNav === item.label;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveNav(item.label)}
                                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-700'
                                            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-r-2 hover:border-purple-700'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="truncate">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-3 border-t border-gray-100">
                    <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
                        <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="truncate">Settings</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
