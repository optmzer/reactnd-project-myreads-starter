import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

/**
*/

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

class SearchPage extends Component {

  state = {
    search_query: ""
    // books_found: []
  }

  onEmpty() {
    let terms = ""
      search_terms.forEach((element, index) => {
        if(index !== search_terms.length) {
          terms += element + ", "
        } else {
          terms += element
        }
      })
    return terms
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

  getSearchResults() {
    //books returned form search does not have shelf attribute.
    //if search_query is not empty
    if(this.state.search_query){

      BooksAPI.search(this.state.search_query, 20).then((found) => {
        console.log("L50 SearchPage - ", found);
        if(found.length) {
            //filter books that already in the state
            this.props.onUpdateNewBooks(found.filter((book) => {
              //if does not include remove it from search result
              return !this.isInCollection(book)
              })//.filter
            )
        }
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
          <Link to="/"
                className="close-search"
                onClick={() => this.props.onUpdateNewBooks(null)}>Close</Link>
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
          { this.props.new_books.length !== 0 ? (
              < BookShelf bookShelfTitle="Search Results"
              books={this.props.new_books}
              onShelfChange={(book, shelfName) => {
                this.props.onShelfChange(book, shelfName)
              }}
              />
            ) : (
              <div>
                <h2 className="bookshelf-title">Add some books to read</h2>
                <div className="bookshelf-books">
                  <h3>Pelase use these earch terms to define your search</h3>
                </div>
                <p>{this.onEmpty()}</p>
              </div>
            )
          }
        </div>
      </div>
    )//return()
  }//render()
}//class SearchPage

export default SearchPage
