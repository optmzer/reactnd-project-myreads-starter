import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


/**
TODO: It changes shelf in the state of the SearchPage
but does not add it into the state of the app.

1 - move books_found into the App.js
2 - add new books into the App.state.
3 - create a button reset search
4 - None is not working in HomePage. it sets the value but does not remove it
from the state.
*/

class SearchPage extends Component {

  state = {
    search_query: "",
    books_found: []
  }

  updateSearchQuery(event) {
    this.setState({
      search_query: event.target.value.trim()
    })
  }

  getSearchResults() {
    // BooksAPI.getAll().then( (b) => {
    //   this.setState({books: b})
    // })

    //if search_query is not empty
    if(this.state.search_query){
      BooksAPI.search(this.state.search_query, 20).then((found) => {
        this.setState({ books_found: found })
      })//.then
    }//if
  }//getSearchResults()

  hndleButtonPress(event) {
    //on press Enterget results form the server
    if(event.key === "Enter"){
      this.getSearchResults()
    }
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
                  onChange={event => this.updateSearchQuery(event)}
                  onKeyPress={(event) => this.hndleButtonPress(event)}
                  />

          </div>
        </div>
        <div className="search-books-results">
        {this.state.books_found.length !== 0 &&

          < BookShelf bookShelfTitle="Search Results"
                      books={this.state.books_found}
                      onShelfChange={(book_id, shelfName) => {
                        this.props.onShelfChange(book_id, shelfName)
                      }} />
        }

        </div>
      </div>
    )//return()
  }//render()
}//class SearchPage


export default SearchPage
