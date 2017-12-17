import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import './sort.css'

class HomePage extends Component  {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    sort_by_value : "title",
    title: "active",
    authors: "",
    averageRating: ""
  }

  updateState(value) {
    switch(value) {
      case "-averageRating":
                      this.setState({
                        sort_by_value : value,
                        title: "",
                        authors: "",
                        averageRating: "active"
                      })
                      break;
      case "authors":
                      this.setState({
                        sort_by_value : value,
                        title: "",
                        authors: "active",
                        averageRating: ""
                      })
                      break;
      default:
                      this.setState({
                        sort_by_value : value,
                        title: "active",
                        authors: "",
                        averageRating: ""
                      })
                      break;
    }//switch
  }

  getSortByValue(event) {
    let value
    if(event.target.id !== ""){
      value = event.target.id
    } else {
      value = event.target.firstChild.id
    }

    //to reverse sort order use minus
    if(value === "averageRating") value = "-averageRating"

    this.updateState(value)
  }//getSortByValueValue()

  //filter books based on shelf name
  //currentlyReading, wantToRead, read
  filterBooks(filterString) {
    if(this.props.books){
      return this.props.books.sort(sortBy(this.state.sort_by_value)).filter((book) => {
        return book.shelf === filterString
      })
    }
  }

  //returns array of currentlyReading books
  getCurrentlyReading() {
    return this.filterBooks("currentlyReading")
  }

  //returns array of wantToRead books
  getWantToRead() {
    return this.filterBooks("wantToRead")
  }

  //returns array of read books
  getRead() {
    return this.filterBooks("read")
  }

  render() {

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <div className="sort">
            <ul className="sort-list"
                >
              <li ><a>Sort my books by</a></li>
              <li className={this.state.title + " sort-list-item title"}
                  onClick={(event) => this.getSortByValue(event)}>
                  <a href="#" id="title">Title</a></li>
              <li className={this.state.authors + " sort-list-item authors"}
                  onClick={(event) => this.getSortByValue(event)}>
                  <a href="#" id="authors">Author</a></li>
              <li className={this.state.averageRating + " sort-list-item ratings"}
                  onClick={(event) => this.getSortByValue(event)}>
                  <a href="#" id="averageRating">Ratings</a></li>
            </ul>
          </div>
        </div>
        <div className="list-books-content">
          <div>
            < BookShelf bookShelfTitle="Currently Reading"
                        books={this.getCurrentlyReading()}
                        onShelfChange={(book, shelfName) => {
                          this.props.onShelfChange(book, shelfName)
                        }} />
            < BookShelf bookShelfTitle="Want To Read"
                        books={this.getWantToRead()}
                        onShelfChange={(book, shelfName) => {
                          this.props.onShelfChange(book, shelfName)
                        }}/>
            < BookShelf bookShelfTitle="Read"
                        books={this.getRead()}
                        onShelfChange={(book, shelfName) => {
                          this.props.onShelfChange(book, shelfName)
                        }}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
        <div className="web-dev"> web dev | Alexander Frolov</div>

      </div>
    )//return()
  }//render()
}//class HomePage

export default HomePage
