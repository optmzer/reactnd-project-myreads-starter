import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
    })
  }//componentDidMount()

  updateBooks(new_book){
      this.setState((state) => ({
        books: state.books.concat([new_book])
      })
    )
  }

  //remove book from the list
  removeBookFromState(book) {
    this.setState(state => ({
      books: state.books.filter(element => {
        return element.id !== book.id
      })
    }))
  }//removeBookFromState()

  //there is such a thing as this.forceUpdate()
  handleShelfChange(book, shelfName) {
    //if book is not in the current state add it
    if(!this.state.books.includes(book)) {
      this.updateBooks(book)
    }

    //TODO: causes a bug. override state with deleted book.
    if("none" === shelfName) {
      this.removeBookFromState(book)
    }

    //update server on book shelf changes
    BooksAPI.update(book, shelfName).then(responce => {

      this.setState(prev_state => ({
        books: prev_state.books.map((b) => {
          //list through books and change shelf if id match
          if(book.id === b.id){
            book.shelf = shelfName
          }

          //if you don't have return statement
          //this caused a bug in HomePage L12
          return b
        })
      }))
    })//.then()
  }//handleShelfChange()

  render() {

console.log("App render L72 - ", this.state.books)

    return (
      <div className="app">
          <Route
          path="/search-books"
          render={() => (
            <SearchPage books={this.state.books}
                        onShelfChange={(book, shelfName) => {
                          this.handleShelfChange(book, shelfName)
                        }} />
                  )}
          />

          <Route
          exact path="/"
          render={() => (
            <HomePage books={this.state.books}
                      onShelfChange={(book, shelfName) => {
                        this.handleShelfChange(book, shelfName)
                      }}/>
                  )}
          />
      </div>
    )
  }
}

export default BooksApp
