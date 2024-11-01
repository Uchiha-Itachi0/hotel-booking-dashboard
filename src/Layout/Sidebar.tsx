import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {routes} from "../config/routes";


const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getActiveItem = () => {
        const path = location.pathname;
        return routes.find(route => route.path === path)?.id || 'dashboard';
    };

    return (
        <div
            className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r z-40 transition-all duration-300 ${
                isExpanded ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col gap-2 p-3 relative">
                {routes.map(({ id, icon: Icon, label, path }) => {
                    const isActive = getActiveItem() === id;
                    return (
                        <div key={id} className="relative">
                            {isActive && (
                                <>
                                    <div className="absolute right-0 top-0 h-14 w-[100vw] bg-gray-50" />
                                    <div className="absolute left-0 top-0 h-14 w-full">
                                        <div className="absolute inset-0 bg-gray-50" />
                                        <div className="absolute right-0 top-0 h-14 w-8 bg-white">
                                            <div className="absolute -left-8 top-0 h-14 w-8 bg-white rounded-tr-full" />
                                            <div className="absolute -left-8 bottom-0 h-14 w-8 bg-white rounded-br-full" />
                                        </div>
                                    </div>
                                </>
                            )}
                            <button
                                onClick={() => navigate(path)}
                                className={`relative flex items-center gap-4 p-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                <span
                                    className={`whitespace-nowrap transition-opacity ${
                                        isExpanded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                  {label}
                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;