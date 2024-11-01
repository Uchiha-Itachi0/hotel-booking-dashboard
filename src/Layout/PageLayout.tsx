import React from 'react';
import {PageLayoutProps} from "../types/routes";


const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="">
                {children || <p className="text-gray-500">Nothing to display here right now</p>}
            </div>
        </div>
    );
};

export default PageLayout;