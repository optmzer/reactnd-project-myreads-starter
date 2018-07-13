import React, {Component} from 'react'
import BookRatings from './BookRatings'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    bookInstance: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    showBooksState: PropTypes.string
  }

  getShelfState() {

    if(this.props && this.props.showBooksState === "true"){

      var shelf = "None"
      switch(this.props.bookInstance.shelf){
        case "wantToRead" :
                        shelf = "Want to read";
                        break;
        case "currentlyReading" :
                        shelf = "Currently Reading";
                        break;
        case "read" :
                        shelf = "Read";
                        break;
        default:
                        shelf = "None"
      }//switch
    }//if
    return shelf
  }//getShelfState()

  render() {

    const {bookInstance} = this.props

    var title,
        thumbnail,
        authors = ""

    var average_rating = 0

    if(bookInstance){
      bookInstance.averageRating && (average_rating = bookInstance.averageRating)
      bookInstance.title ? title = bookInstance.title : title = "Could not find a title"
      bookInstance.imageLinks ? thumbnail = bookInstance.imageLinks.smallThumbnail : thumbnail = "./icons/icon-no-image.png"

      if(bookInstance.authors){
        bookInstance.authors.forEach((value, index) => {
          if(index > 0){
            authors += (", " + value)
          } else {
            authors += value
          }
        })
      } else {
        //some fields are left empty
        authors += "Authors not stated"
      }//if else
    }
    return(
      <div className="book">
      { this.props.showBooksState &&
        (<div className="book-shelf">
          <h4>{this.getShelfState()}</h4>
        </div>)
      }
        <div className="book-top">
          <a target="_blank" href={bookInstance.infoLink}>
            <div  className="book-cover"
                  style={{
                          width: 128,
                          height: 188,
                          backgroundImage: `url(${thumbnail})` }}></div>
          </a>
          <div className="book-shelf-changer">
            <select id={bookInstance.id}
                    onChange={(event) => (
                      this.props.onShelfChange(bookInstance, event.target.value)
                    )} >
              <option value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-ratings">
          <BookRatings averageRating={average_rating} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )//return()
  }//render()
}//class Book

export default Book
