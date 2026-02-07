import React from "react";

export interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: string
}