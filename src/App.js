import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'

class SearchPage extends Component {

  state = {
    search_query: ""
  }

  getSearchResults(search_query) {
    BooksAPI.search(search_query, 20).then(search_result => {
      console.log(search_result)
    })
  }

  updateSearchQuery(event) {
    this.setState({
      search_query: event.target.value.trim()
    })
  }

  render() {

    const {search_query} = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
                  placeholder="Search by title or author"
                  value={search_query}
                  onChange={this.updateSearchQuery}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )//return()
  }//render()
}//class SearchPage


class BooksApp extends React.Component {

constructor(props) {
  super(props)

  this.handleShelfChange = this.handleShelfChange.bind(this)
}
  state = {
    books: []
  }

  handleShelfChange(event) {
    //function is called from <Book /> that does not have a state.
    var book_id = event.target.id
    var shelf_selected = event.target.value

    event.preventDefault()

    //update server
    BooksAPI.update({id: book_id}, shelf_selected).then(function(responce) {
      BooksAPI.getAll().then( (b) => {
        this.setState({books: b})
      })
    }
  )
}//handleShelfChange()

  componentDidMount() {
    this.getAllBooks()
  }//componentDidMount()

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
            <SearchPage />
          )}
          />

          <Route
          exact path="/"
          render={() => (
            <HomePage books={this.state.books}
                      onShelfChange={this.handleShelfChange}/>
          )}
          />
      </div>
    )
  }
}

export default BooksApp
