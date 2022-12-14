import React from 'react';
export interface TitledElementProps {
    title: string;
    children: React.ReactNode;
}
export declare const TitledElement: ({ title, children }: TitledElementProps) => JSX.Element;
