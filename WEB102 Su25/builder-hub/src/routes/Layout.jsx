import { Outlet, Link } from "react-router-dom"

function Layout () {
  return (
    <div>
        <nav>
            <h1>Builder Hub</h1>
        </nav>
        <main className="content">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout;