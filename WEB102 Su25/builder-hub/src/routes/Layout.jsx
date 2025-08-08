import { Outlet, Link } from "react-router-dom"

function Layout () {
  return (
    <div>
        <nav>
            <Link to={'/'}><h1>Builder Hub</h1></Link>
        </nav>
        <main className="content">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout;