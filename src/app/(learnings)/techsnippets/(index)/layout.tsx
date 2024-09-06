
import { ExploreLayout } from "@/components/Explore";
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "Learnium - TechSnippet",
	description: "TechSnippet"
}

const Layout = ({ children }: { children: ReactNode }) => {
    return (
            
            <ExploreLayout>
                
                {children}
            </ExploreLayout>
    )
};

export default Layout;