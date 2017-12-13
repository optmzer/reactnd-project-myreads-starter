import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {

  static propTypes = {
    bookShelfTitle: PropTypes.string,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    emptyPageBanner: PropTypes.string,
    showBooksState: PropTypes.string
  }

  render() {
    var bookShelfTitle = ""
    var empty_page = "Add some books to read"

    if(this.props.books) {
      bookShelfTitle = this.props.bookShelfTitle
    }

    if(this.props.emptyPageBanner) {
      empty_page = this.props.emptyPageBanner
    }

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {
            this.props.books.length !== 0 ? (
              this.props.books.sort(sortBy('title')).map((book) => (
                <li key={book.id}>
                <Book bookInstance={book}
                      showBooksState={this.props.showBooksState}
                      onShelfChange={(book, shelfName) => {
                        this.props.onShelfChange(book, shelfName)
                }}/>
                </li>
              ))
            ) : (
              <p>{empty_page}</p>
          )}</ol>
        </div>
      </div>
    )//return()
  }//render()
}//class BookShelf

export default BookShelf
