import React from "react";
import "./ErrorPage.scss";
    
    interface ErrorPageProps {}
    
    const ErrorPage: React.FC<ErrorPageProps> = () => {
        return (
            <div className="ErrorPage">
                ErrorPage Component
            </div>
        );
    };
    
    export default ErrorPage;