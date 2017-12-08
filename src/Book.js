import React, {Component} from 'react'

class Book extends Component {

  outputEvent(event) {
    console.log(event)
    console.log(event.target)
  }

  render() {

    const {bookInstance} = this.props

    var title,
        thumbnail,
        authors = ""

    if(bookInstance){
      title = bookInstance.title
      thumbnail = bookInstance.imageLinks.smallThumbnail
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
        <div className="book-top">
          <div className="book-cover" style={{
                                            width: 128,
                                            height: 188,
                                            backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select id={bookInstance.id}
                    onChange={(event) => this.props.onShelfChange(bookInstance, event.target.value)}
                    >
              <option value="none">Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )//return()
  }//render()
}//class Book

export default Book
