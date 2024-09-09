import { LearnixLayout } from "@/components/Learnix";
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "Learnium - LearniX",
	description: "LearniX"
}

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <LearnixLayout>
                {children}
        </LearnixLayout>                
    )
};

export default Layout;