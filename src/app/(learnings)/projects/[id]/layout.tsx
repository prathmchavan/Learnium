import { ProjectLayout } from "@/components/Project/Layout"
import { ReactNode } from "react"


const Layout =({children}:{children : ReactNode})=>{
    return(
        <ProjectLayout>
            {children}
        </ProjectLayout>
    )
}

export default Layout;