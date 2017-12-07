import React, {Component} from 'react'
import Book from './Book'

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
          {
            this.props.books.map((book) => (
              <li key={book.id}>
              <Book bookInstance={book}
                    onShelfChange={(book_id, shelfName) => {
                      this.props.onShelfChange(book_id, shelfName)
                    }}/>
              </li>
            ))
          }
          </ol>
        </div>
      </div>
    )//return()
  }//render()
}//class BookShelf

export default BookShelf
