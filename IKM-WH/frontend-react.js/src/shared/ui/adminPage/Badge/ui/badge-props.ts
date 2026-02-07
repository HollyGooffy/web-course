import { ReactNode} from "react";

export type BadgeProps ={
    children: ReactNode;
    className?: string
    variant: 'active' | 'inactive' | "soon" | "draft"
}