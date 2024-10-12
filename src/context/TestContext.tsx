"use client"
import { AptiResultTypes, OaResultTypes } from '@/interface/testResultTypes';
import { createContext, ReactNode, useContext, useState } from 'react';


interface TestContextType {
    OatestData: OaResultTypes |undefined;
    AptitestData: AptiResultTypes |undefined;
    setOATestData: React.Dispatch<React.SetStateAction< OaResultTypes | undefined>>;
    setAptiTestData: React.Dispatch<React.SetStateAction< AptiResultTypes | undefined>>;
}

// Initialize the context with a default value
const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
    const [OatestData, setOATestData] = useState<OaResultTypes>();
    const [AptitestData, setAptiTestData] = useState<AptiResultTypes>();


    return (
        <TestContext.Provider value={{ OatestData, AptitestData ,setAptiTestData, setOATestData }}>
            {children}
        </TestContext.Provider>
    );
};

export const useTestContext = () => {
    const context = useContext(TestContext);
    if (context === undefined) {
        throw new Error("useTestContext must be used within a TestProvider");
    }
    return context;
};
