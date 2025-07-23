import { Outlet, Link } from "react-router-dom"

function Layout(){
  return (
    <div>
        <nav>
            <h1>Recipe Finder</h1>
            <p>Find new and unique recipes! 😋🥘</p>
            <Link className="home-link" key="home-button" to="/">
                Home
            </Link>
        </nav>
        <main className="content">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout;