import { AuthProvider } from "@/context/AuthContext";
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Auth page",
    description:"Login or Create account to use learnium"
}

export default function AuthLayout({
    children ,
}: Readonly<{children:React.ReactNode;}>){
    return(
        <AuthProvider>

        {children}
        </AuthProvider>
    );
}