import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Nav() {
    const {  role  } = useSelector((state) => state.cuisine)
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                {/* <a className="btn btn-ghost text-xl">da Foods</a> */}
                <Link
                        to="/"
                        className="btn btn-ghost text-xl">
                        da Foods
                </Link>
            </div>
            <div className="flex-none hidden md:block">
                <button className={role == 'admin'? 'btn btn-ghost' : 'btn btn-ghost hidden'}>
                    <Link
                        to="/add"
                        className={role == 'admin'? '' : 'hidden'}>
                        Add Food
                    </Link>                 
                </button>
                <button className="btn btn-ghost">
                    <Link
                        to="/my-order"
                        className="">
                        My Order
                    </Link>                 
                </button>
                <button onClick={handleLogout} className="btn btn-ghost">
                    Log Out
                </button>
            </div>
            <div className="dropdown dropdown-end md:hidden">
                <div tabIndex={0} role="button" className="btn"><img className="object-containobject-scale-down h-7 w-7" src="./navbar.png" alt="" /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <button className={role == 'admin'? 'btn btn-ghost' : 'btn btn-ghost hidden'}>
                        <Link
                            to="/add"
                            className={role == 'admin'? '' : 'hidden'}>
                            Add Food
                        </Link>                 
                    </button>
                    <button className="btn btn-ghost">
                        <Link
                            to="/my-order"
                            className="">
                            My Order
                        </Link>                 
                    </button>
                    <button onClick={handleLogout} className="btn btn-ghost">
                        Log Out
                    </button>
                </ul>
            </div>
        </div>
        </>
    )
}