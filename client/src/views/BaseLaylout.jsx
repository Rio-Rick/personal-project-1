import Nav from "../componnent/Nav";
import { Outlet } from "react-router-dom"
export default function BaseLayout () {
    return(
        <>
            <Nav />
            <Outlet />
        </>
    )
}