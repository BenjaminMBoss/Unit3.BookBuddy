import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from "./components/Navigations"
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'
import SingleBook from './components/SingleBook'
import AboutUs from './components/AboutUs'
import SearchBar from './components/SearchBar'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [checkedBooks, setCheckedBooks] = useState([])


  useEffect(() => {
    const attemptLogin = async() => {
      const loggedInToken = window.localStorage.getItem('token')
      

      if(loggedInToken){
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })

        setUser(response.data)
      }else{
        
        throw 'no token'
      }

    }
   
    attemptLogin()
    
  },[token])

  useEffect(() => {
    const getBooks = async () => {
      const {data} = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      setBooks(data.books)
    }
    getBooks();
  },[])


  const CheckoutBook = async (book) => {
    const response = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`, {available: false}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        })
    console.log(response)
    setCheckedBooks([...checkedBooks,response.data.book])
   
  }
  
  useEffect (() => {

   

    
    const reservations = async () => {
      const loggedInToken = window.localStorage.getItem('token')
      if(loggedInToken) {
        const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        setCheckedBooks(response.data.reservation)
      } else {
          
        throw 'no token'
      }
      }
  
      reservations();
    },[token])
  
    const returnBook = async (book) => {
      await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book.id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              })
      setCheckedBooks(checkedBooks.filter((_book) => {return _book.id !== book.id}))
    }
  
 
  return (
    <>
    <h1><img id='logo-image' src={bookLogo}/><Link to='/'>Library App</Link></h1>
    <Navigations user={user}/>
    <Routes>
      <Route path='/' element={<Homepage token={token}/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/successReg' element={<SuccessRegi />}/>
      <Route path='/books' element={<Books books={books}/>}/>
      <Route path='/books/:id' element={<SingleBook books={books} CheckoutBook={CheckoutBook}/>}/>
      <Route path='/search' element={<SearchBar books={books}/>}/>
      <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken} checkedBooks={checkedBooks} returnBook={returnBook}/>}/>
    </Routes>

      
    </>
  )
}

export default App
