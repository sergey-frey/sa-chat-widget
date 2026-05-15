import { DreamyProvider as BaseDreamyProvider } from "@dreamy-ui/react";
import domMax from "motion/react";

interface DreamyProviderProps {
    children: React.ReactNode;
}

export function DreamyProvider({ children }: DreamyProviderProps) {
    return (
        <BaseDreamyProvider motionFeatures={domMax}>
            {children}
        </BaseDreamyProvider>
    );
}
