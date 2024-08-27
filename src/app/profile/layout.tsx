
import ProfileLayout from "@/components/Profile/Layout";
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Profile ",
    description:"Personalised your learnium"
}

export default function ProfilePageLayout({
    children ,
}: Readonly<{children:React.ReactNode;}>){
    return(
        
        <ProfileLayout>

        {children}
        </ProfileLayout>
        
    );
}