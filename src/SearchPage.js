import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

/**
*/
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

  state = {
    search_query: ""
  }

  updateSearchQuery(value) {
    this.setState({
      search_query: value
    })
  }

  clearQuery() {
    this.setState({search_query: ""})
  }

  //compares this.props.books with a book
  //returns true if book is in the this.props.books
  isInCollection(book) {
    var result = false
    this.props.books.forEach(function (element){
        if(element.id === book.id || element.title === book.title)
          result = true
      }
    )
    return result
  }//isInCollection()

  getSearchResults(query) {
    //books returned form search does not have shelf attribute.
    //if search_query is not empty

    if(query){

      BooksAPI.search(query, 20).then((found) => {
        if(found.length) {
            //filter books that already in the state
            this.props.onUpdateNewBooks(found.filter((book) => {
              //if does not include remove it from search result
              return !this.isInCollection(book)
              })//.filter
            )
        } else {
          searchComesUpWithNothing = "We could not find any books for you with this parameters"
          this.props.onUpdateNewBooks(null)
        }
      })//.then
    }//if
    //If I put clearQuery in here, it will delete search_query
    //faster then it will set it.
  }//getSearchResults()

  handleButtonPress(key) {
    //on press Enterget results form the server
    if(key === "Enter"){
      this.getSearchResults(this.state.search_query)
    }
  }

  handleTermClick(value) {
    this.updateSearchQuery(value)
    this.getSearchResults(value)
  }

  render() {

    const {search_query} = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"
                className="close-search"
                onClick={() => this.props.onUpdateNewBooks(null)}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                  placeholder="Search by title or author"
                  value={search_query}
                  onChange={(event) => this.updateSearchQuery(event.target.value)}
                  onKeyPress={(event) => this.handleButtonPress(event.key)}
                  />
          </div>
        </div>
        <div className="search-books-results">
              < BookShelf bookShelfTitle="Search Results"
                          books={this.props.new_books}
                          emptyPageBanner={searchComesUpWithNothing}
                          onShelfChange={(book, shelfName) => {
                            this.props.onShelfChange(book, shelfName)
                          }}
              />
              <div>
                <h2 className="bookshelf-title"></h2>
                <div className="bookshelf-books">
                  <h3>Use search bar or terms below to define your search</h3>
                </div>
                <p>{search_terms.map((element, index) => {
                  return(
                    <span key={element + index}>
                      <a  href="#"
                          onClick={(event) => {
                            this.handleTermClick(event.target.id)
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
