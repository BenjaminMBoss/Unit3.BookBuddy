import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({books}) => {
    const [search, setSearch] = useState("")
    
    const filteredBooks = books.filter((book) => {
        return book.title.indexOf(search) !== -1;
    })

    const SearchBook = () => {
        return (
            <div>
                <label>
                    <input 
                        type="text"
                        name="search"
                        autoFocus="autoFocus"
                        value={search}
                        placeholder="Search"
                        onChange={(event) => {setSearch(event.target.value)}}
                        />
                </label>
            </div>
        )
    }

    return (
        <div>
            <h1>Search</h1>
            <SearchBook/>
            {
                search.length > 0 ?
                    
                <div>
                    <h3> Viewing {filteredBooks.length} of {books.length}</h3>
                    <ul>
                    {
                        filteredBooks.map((book) => {
                            return (
                                <Link key={book.id} to={`/books/${book.id}`}>
                                    <li> {book.title}</li>
                                </Link>
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

export default SearchBar;