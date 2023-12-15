
import { useNavigate } from "react-router-dom"


const Account = ({user, setUser, setToken, checkedBooks, returnBook}) => {
    const navigate = useNavigate()
    
    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null)
        setUser({})
        navigate('/')
    }
    if(!user.books){
        return null
    }

    const handleReturn = (book) => {
        returnBook(book)
    }

    return(
        <div>
            <h1>Account</h1>
            <button onClick={() => {logout()}}>Logout</button>
            <hr/>
            <h2>Email: {user.email}</h2>
            { checkedBooks.length > 0 ? 
                <div>
                <h4>Checked Out Books ({checkedBooks.length}):</h4>
                <ul>
                    {
                        checkedBooks.map((book) => {
                            return (
                                <div key={book.id}>
                                    <li> {book.title}</li>
                                    <button onClick={()=> {handleReturn(book)}}>Return Book</button>
                                </div>
                                
                            )
                        })
                    }
                </ul>
                </div>
                : 
                null
            }
            
            
            
            
           
        </div>
    )
}

export default Account