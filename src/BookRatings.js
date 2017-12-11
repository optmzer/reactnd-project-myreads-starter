import React, {Component} from 'react'

const full_star = require("./icons/star-full.png")
const half_star = require("./icons/star-half.png")
const empty_star = require("./icons/star-empty.png")

const ratings = [
  empty_star,
  empty_star,
  empty_star,
  empty_star,
  empty_star
]

class BookRatings extends Component {

  getBookRating(rating) {
    var book_rating = ratings.map((element) => {return element})
    if(Number.isInteger(rating) && rating > 0) {

        var counter = 0
        book_rating = ratings.map(element => {
          if(counter < rating) {
            element = full_star
            ++counter
          }
          return element
        })

    } else if (!Number.isInteger(rating)){
      //it is a float
      for(var j = 0; j < Math.floor(rating); ++j) {
        book_rating[j] = full_star
      }
       //+ half star
       book_rating[Math.ceil(rating) - 1] = half_star
    }
    return book_rating
  }//getBookRating()

  render() {

    var current_book_rating = this.getBookRating(this.props.averageRating)

    return(
      <div className="book-ratings-stars">
        {
          current_book_rating.map((element, index) => {
            return (
              <span key={index}>
                <img src={element} alt={"rating of the book " + element}/>
              </span>)
          })
        }
      </div>
    )//return()
  }//render()

}//class BookRatings

export default BookRatings
