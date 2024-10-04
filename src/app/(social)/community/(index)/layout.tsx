import { CommunityLayout } from "@/components/Community/Layout";
import { ReactNode } from "react";

const Layout =({children}:{children:ReactNode})=>{
    return(
        <CommunityLayout>
            {children}
        </CommunityLayout>
        
    )
}

export default Layout;