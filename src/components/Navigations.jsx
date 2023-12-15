import { Link } from "react-router-dom"

const Navigations = ({user}) => {
    
    
    return (
        <nav>
            <span>
                <Link to='/'>Home</Link>
                <Link to='/books'>Books</Link>
                <Link to='/about'>About</Link>
                <Link to='/search'>Search</Link>
            </span>
            
            {
                user.email ? (
                    <span>
                        <Link to="/account">User</Link>
                    </span>
                
                ) : (
                    
                    <span>
                        <Link to="/login">Login</Link>
                        <Link to='/register'>Register</Link>
                    </span>
                )
            }
        </nav>
    )
}

export default Navigations