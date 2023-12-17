const Homepage = ({token}) => {
    return(
        <div>
            {
                token !== null ? 
                <div>
                    <h1>Welcome to our library!</h1>
                    <h4>Thank you for logging in! </h4>
                    <p>Check out any of our available books or return one of your checked out books.</p>
                </div>
                :
                <div>
                    <h1>Welcome to our library!</h1>
                    <h4>Feel free to browse our books in our library! To check out a book, please log in or create an account.</h4>
                </div>
            }

        </div>
    )
}

export default Homepage