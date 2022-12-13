import React from 'react';
import "./TitledElement.css"

export interface TitledElementProps {
  title: string
  children: React.ReactNode
}

export const TitledElement = ({title, children}: TitledElementProps) => {
  return (
    <div>
      <span className={"titledElement__title"}>{title}</span>
      {
        children
      }
    </div>
  );
};
