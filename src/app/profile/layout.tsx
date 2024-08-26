import { AuthProvider } from "@/context/AuthContext";
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Profile ",
    description:"Personalised your learnium"
}

export default function ProfileLayout({
    children ,
}: Readonly<{children:React.ReactNode;}>){
    return(
        <AuthProvider>

        {children}
        </AuthProvider>
    );
}