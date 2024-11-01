import React from 'react';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 px-4">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-gray-800">Hotel Analytics</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Admin Dashboard</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;