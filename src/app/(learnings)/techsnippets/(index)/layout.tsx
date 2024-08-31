
import { ExploreLayout } from "@/components/Explore";
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "OnlyMess - Treat Page",
	description: "OnlyMess Treat"
}

const Layout = ({ children }: { children: ReactNode }) => {
    return (
            <ExploreLayout>
                {children}
            </ExploreLayout>
    )
};

export default Layout;