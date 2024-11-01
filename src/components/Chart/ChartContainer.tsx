// src/components/ChartContainer.tsx
import CustomCard from '../CustomCard';
import React from "react";

interface ChartContainerProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
                                                                  title,
                                                                  children,
                                                                  className = ""
                                                              }) => (
    <CustomCard title={title} className={className}>
        {children}
    </CustomCard>
);
