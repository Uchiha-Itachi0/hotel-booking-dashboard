import { LucideProps } from 'lucide-react';
import React from "react";

export interface RouteConfig {
    id: string;
    path: string;
    icon: React.ComponentType<LucideProps>; // Updated type for icon
    label: string;
    component: React.FC;
}

export interface PageLayoutProps {
    title: string;
    children?: React.ReactNode;
}
