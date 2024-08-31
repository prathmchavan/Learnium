import { ExplorePageLayout } from "@/components/ExplorePage";
import { ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <ExplorePageLayout>
            {children}
        </ExplorePageLayout>
    )
};

export default Layout;