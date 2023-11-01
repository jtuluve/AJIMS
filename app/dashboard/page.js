import Menu from "@components/menu.jsx"
import Profile from "@/components/profile"
import Research from "@/components/research"
import Academics from "@/components/academics"
import Professional from "@/components/professional"
import "@css/dashboard.css"
export default function Dashboard(){
    return(
        <div className="menu-container">
            <Menu/>
            <div className="menu2">
                <Profile/>
                <Research/>
                <Academics/>
                <Professional/>
            </div>
        </div>
    )
}