import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import _score from 'underscore'

//defines available search terms for the search API.
const search_terms = [
  'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen',
  'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus',
  'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',  'Cricket', 'Cycling',
  'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing',
  'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First',
  'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo',
  'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
  'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
  'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
  'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
  'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun',
  'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality',
  'Web Development', 'iOS']

var searchComesUpWithNothing = "Please define search parameters"

class SearchPage extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    new_books: PropTypes.array.isRequired,
    onUpdateNewBooks: PropTypes.func.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  //compares this.props.books with a book
  //returns true if book is in the this.props.books
  getShelf(book) {
    var shelf = "none"
    this.props.books.forEach(function (element){
        if(element.id === book.id)
          shelf = element.shelf
      }
    )
    return shelf
  }//isInCollection()

  /**
   * Sends request to search server and waits for the promise
   * Sets new_books to empty if search_query is empty or
   * BooksAPI returns empty results.
   */
  getSearchResults(query) {
    //if search_query is not empty
    if(query !== "" || this.props.searchQuery){
      BooksAPI.search(query, 10).then((found) => {
        if(found.length && this.props.searchQuery) {
            //set book shelf attribute to search resutl
            this.props.onUpdateNewBooks(found.map((book) => {
              //if does not include remove it from search result
              book.shelf = this.getShelf(book)
              return book
            })//.map
            )
        } else {
          searchComesUpWithNothing = "We could not find any books for you with this parameters"
          this.props.onUpdateNewBooks(null)
        }
      })//.then
    } else {
      this.props.onUpdateNewBooks(null)
    }//if else
  }//getSearchResults()


  /**
   * sets search query and gets books from the server
   */
  handleInput(value) {
    this.props.onSetSearchQuery(value)
    //reducec amounts of requests to server while typing
    _score.debounce(this.getSearchResults(value), 500)
  }

  render() {

    return(
      <div className="search-books">
          <div className="search-books-bar">
            <Link to="/"
                  className="close-search"
                  onClick={() => {
                    this.props.onUpdateNewBooks(null)
                    this.props.onReturnToMain()
                  }}
                  >Close</Link>
            <div className="search-books-input-wrapper">
              <input  type="text"
                      placeholder="Search by title or author"
                      value={this.props.searchQuery}
                      onChange={(event) => {
                      this.handleInput(event.target.value)
                      }}
                    />
            </div>
          </div>
        <div className="search-books-results">
              < BookShelf bookShelfTitle="Search Results"
                          books={this.props.new_books}
                          emptyPageBanner={searchComesUpWithNothing}
                          showBooksState="true"
                          onShelfChange={(book, shelfName) => {
                            this.props.onShelfChange(book, shelfName)
                          }}
              />
              <div>
                <h2 className="bookshelf-title"></h2>
                <div className="bookshelf-books">
                  <h3>Pelase use search bar or click on a term below to define your search</h3>
                </div>
                <p>{search_terms.map((element, index) => {
                  return(
                    <span key={element + index}>
                      <a  className="search-term"
                          href="#"
                          onClick={(event) => {
                            this.handleInput(event.target.id)
                            }
                          }
                          id={element}>{element}</a>{search_terms.length -1 !== index && " | "}
                    </span>
                  )
                })}</p>
              </div>

        </div>

        <div className="web-dev"> web dev | Alexander Frolov</div>

      </div>
    )//return()
  }//render()
}//class SearchPage

export default SearchPage
