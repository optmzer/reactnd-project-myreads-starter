import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


/**
TODO: It changes shelf in the state of the SearchPage
but does not add it into the state of the app.

1 - move books_found into the App.js
2 - remove added book from the search page.
5 - check if a book is already on one of the shelves L39
*/

class SearchPage extends Component {

  state = {
    search_query: "",
    books_found: []
  }

  updateSearchQuery(value) {
    this.setState({
      search_query: value
    })
  }

  clearQuery() {
    this.setState({search_query: ""})
  }

  getSearchResults() {

    //if search_query is not empty
    if(this.state.search_query){
      BooksAPI.search(this.state.search_query, 20).then((found) => {
        //filter books that already in the state
        this.setState({ books_found: found })
      })//.then
    }//if
  }//getSearchResults()

  hndleButtonPress(key) {
    //on press Enterget results form the server
    if(key === "Enter"){
      this.getSearchResults()
      this.clearQuery()
    }
  }

  render() {

    const {search_query} = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text"
                  placeholder="Search by title or author"
                  value={search_query}
                  onChange={event => this.updateSearchQuery(event.target.value)}
                  onKeyPress={(event) => this.hndleButtonPress(event.key)}
                  />

          </div>
        </div>
        <div className="search-books-results">
        {this.state.books_found.length !== 0 &&

          < BookShelf bookShelfTitle="Search Results"
                      books={this.state.books_found}
                      onShelfChange={(book, shelfName) => {
                        this.props.onShelfChange(book, shelfName)
                      }} />
        }

        </div>
      </div>
    )//return()
  }//render()
}//class SearchPage


export default SearchPage
