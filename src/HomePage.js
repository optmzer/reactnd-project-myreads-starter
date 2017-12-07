import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'


class HomePage extends Component  {

  //filter books based on shelf name
  //currentlyReading, wantToRead, read
  filterBooks(filterString) {
    if(this.props.books){
      return this.props.books.filter((book) => {
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
        </div>
        <div className="list-books-content">
          <div>
            < BookShelf bookShelfTitle="Currently Reading"
                        books={this.getCurrentlyReading()}
                        onShelfChange={(book_id, shelfName) => {
                          this.props.onShelfChange(book_id, shelfName)
                        }} />
            < BookShelf bookShelfTitle="Want To Read"
                        books={this.getWantToRead()}
                        onShelfChange={(book_id, shelfName) => {
                          this.props.onShelfChange(book_id, shelfName)
                        }}/>
            < BookShelf bookShelfTitle="Read"
                        books={this.getRead()}
                        onShelfChange={(book_id, shelfName) => {
                          this.props.onShelfChange(book_id, shelfName)
                        }}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search-books">Add a book</Link>
        </div>
      </div>
    )//return()
  }//render()
}//class HomePage



export default HomePage
