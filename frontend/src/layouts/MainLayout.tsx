import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const MainLayout = () => {
    return (
    <>
        <div className="row">
          <Navbar></Navbar>
        </div>
        <main>
            <Outlet></Outlet>
        </main>
    </>
    )
}

export default MainLayout;