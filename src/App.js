import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends Component {

  render() {
    // console.log("Book.render = ", this.props.bookInstance)

    const {bookInstance} = this.props

    var title,
        thumbnail,
        authors = ""

    if(bookInstance){
      title = bookInstance.title
      thumbnail = bookInstance.imageLinks.smallThumbnail
      bookInstance.authors.forEach((value, index) => {
        if(index > 0){
          authors += (", " + value)
        } else {
          authors += value
        }
      })
    }

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
                                            width: 128,
                                            height: 188,
                                            backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )//return()
  }//render()
}//class Book

class BookShelf extends Component {
  render() {
    var bookShelfTitle = ""

    if(this.props.books) {
      bookShelfTitle = this.props.bookShelfTitle
    }

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book bookInstance={this.props.books[0]}/>
            </li>
            <li>
              <Book bookInstance={this.props.books[1]}/>
            </li>
          </ol>
        </div>
      </div>
    )//return()
  }//render()
}//class BookShelf

class SearchPage extends Component {
  render() {
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
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )//return()
  }//render()
}//class SearchPage

class HomePage extends Component  {

  filterBooks(filterString) {
    if(this.props){
      return this.props.books.filter((book) => {
        return book.shelf === filterString
      })
    }
  }

  //currentlyReading
  getCurrentlyReading() {
    return this.filterBooks("currentlyReading")
  }

  getWantToRead() {
    return this.filterBooks("wantToRead")
  }

  getRead() {
    return this.filterBooks("read")
  }

  render() {

    // console.log('currentlyReading', this.getCurrentlyReading())
    // console.log('currentlyReading', this.getWantToRead())
    // console.log('currentlyReading', this.getRead())

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            < BookShelf bookShelfTitle="Currently Reading" books={this.getCurrentlyReading()}/>

            < BookShelf bookShelfTitle="Want To Read" books={this.getWantToRead()}/>

            < BookShelf bookShelfTitle="Want To Read" books={this.getRead()}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search-books">Add a book</Link>
        </div>
      </div>

    )//return()
  }//render()
}//class HomePage

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
    })
  }//componentDidMount()

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
            <HomePage books={this.state.books}/>
          )}
          />
      </div>
    )
  }
}

export default BooksApp
