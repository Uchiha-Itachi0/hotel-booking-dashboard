import React from 'react';

interface CustomCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children, className = "" }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default CustomCard;
