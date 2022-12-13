import React from 'react';
import "./TitledElement.css";
export const TitledElement = ({ title, children }) => {
    return (React.createElement("div", null,
        React.createElement("span", { className: "titledElement__title" }, title),
        children));
};
//# sourceMappingURL=TitledElement.js.map