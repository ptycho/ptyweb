import React from 'react';
import "./TitledElement.css";
export interface TitledElementProps {
    title: string;
    children: React.ReactNode;
}
export declare const TitledElement: ({ title, children }: TitledElementProps) => JSX.Element;
