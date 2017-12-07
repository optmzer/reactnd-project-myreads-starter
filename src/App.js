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

  handleShelfChange(book_id, shelfName) {
    console.log("book_id = " + book_id + "; shelfName = " + shelfName)
    BooksAPI.update({id: book_id}, shelfName).then(responce => {
      console.log("Server responce = ", responce)
    })
  }//handleShelfChange()

  componentDidMount() {
    this.getAllBooks()
  }//componentDidMount()

  getAllBooks() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
      console.log("getAllBooks() state changed")
    })
  }

  render() {

    return (
      <div className="app">
          <Route
          path="/search-books"
          render={() => (
            <SearchPage />
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
