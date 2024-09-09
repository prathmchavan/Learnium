
import { LearnixPageLayout } from "@/components/LearnixPage";
import { ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <LearnixPageLayout>
            {children}
        </LearnixPageLayout>
    )
};

export default Layout;