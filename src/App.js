import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

  state = {
    search_query: "",
    books: [],
    new_books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
    })
  }//componentDidMount()

// ====== SearchPage methods ======
  setSearchQuery(value) {
    this.setState({
      search_query: value.trim(),
    })
  }//updateSearchQuery()

  setNewBooks(new_books) {
    if(new_books === null){
      this.setState({
        search_query: "",
        new_books: []
      })
    }else {
      this.setState({new_books: new_books})
    }
  }//setNewBooks()

// ====== HomePage methods ======
  isInBooks(book) {
    var present = false
    this.state.books.forEach(element => {
      if(element.id === book.id) present = true
    })
    return present
  }//isInBooks()

  addBookToBooks(new_book){
      this.setState((state) => ({
        books: state.books.concat([new_book])
      })
    )
  }

  //remove book from the list
  removeBookFromBooks(book) {
    this.setState(state => ({
      books: state.books.filter(element => {
        return element.id !== book.id
      })
    }))
  }//removeBookFromState()

  handleShelfChange(book, shelfName) {
    //if book is not in the current state add it
    if(!this.isInBooks(book)) {
      this.addBookToBooks(book)
    }

    //update server on book shelf changes
    BooksAPI.update(book, shelfName).then(responce => {

      this.setState(prev_state => ({
        books: prev_state.books.map((b) => {
          //list through books and change shelf if id match
          if(book.id === b.id){
            book.shelf = b.shelf = shelfName
          }
          return b
        })
      }))
    })//.then()

  }//handleShelfChange()

  render() {

    return (
      <div className="app">
          <Route
          path="/search"
          render={({history}) => (
            <SearchPage onSetSearchQuery={
                        (search_query) => this.setSearchQuery(search_query)
                        }
                        searchQuery={this.state.search_query}
                        books={this.state.books}
                        new_books={this.state.new_books}
                        onUpdateNewBooks={(new_books) => this.setNewBooks(new_books)}
                        onShelfChange={(book, shelfName) => {
                          this.handleShelfChange(book, shelfName)
                        }}
                        onReturnToMain={() => {
                          history.push("/")
                        }}
                       />
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
