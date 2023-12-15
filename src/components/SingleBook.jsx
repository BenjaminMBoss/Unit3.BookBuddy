import { Link, useParams } from "react-router-dom";


const SingleBook = ({books, CheckoutBook}) => {
    const params = useParams();
    const id = params.id * 1

    const handleCheckout = (book) => {
        CheckoutBook(book);
    }
    
    const singleBook = books.find((book) => {
        return book.id === id;
    })

    if (!singleBook) {
        return null;
    }
    
    return (
        <div>
            <h1>{singleBook.title}</h1>
            <h3>{singleBook.author}</h3>
            <h4>{singleBook.available === true ? "Available" : "Not Available"}</h4>
            <p>{singleBook.description}</p>
            <img src={singleBook.coverimage}/>
            <br/>
            {singleBook.available === true ? <button onClick={() => {handleCheckout(singleBook)}}>Check out Book</button> : null}
            
            <hr/>
            <Link to='/books'>Back to all books</Link>
        </div>
    )
}

export default SingleBook;