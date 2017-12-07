import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import BookShelf from './BookShelf'

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


export default SearchPage
