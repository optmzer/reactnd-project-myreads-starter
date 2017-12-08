import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }//componentDidMount()

  //there is such a thing as this.forceUpdate()
  handleShelfChange(book_id, shelfName) {

    BooksAPI.update({id: book_id}, shelfName).then(responce => {

      // //this works but have to get all book over the net
      // this.getAllBooks()

      //this causes TypeError book is not defined in HopePage line 13
      this.setState(prev_state => ({
        books: prev_state.books.map((book) => {
          //list through books and change shelf if id match
          if(book_id === book.id){
            book.shelf = shelfName
          }
          //if you don't have return statement
          //this caused a bug in HomePage L12
          return book
        })
      }))
    })//.then()
  }//handleShelfChange()


  getAllBooks() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
    })
  }

  render() {

    return (
      <div className="app">
          <Route
          path="/search-books"
          render={() => (
            <SearchPage onShelfChange={(book_id, shelfName) => {
                          this.handleShelfChange(book_id, shelfName)
                        }} />
          )}
          />

          <Route
          exact path="/"
          render={() => (
            <HomePage books={this.state.books}
                      onShelfChange={(book_id, shelfName) => {
                        this.handleShelfChange(book_id, shelfName)
                      }}/>
          )}
          />
      </div>
    )
  }
}

export default BooksApp
