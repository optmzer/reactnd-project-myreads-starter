import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {

constructor(props) {
  super(props)

  this.handleShelfChange = this.handleShelfChange.bind(this)
}
  state = {
    books: []
  }

  handleShelfChange(event) {
    //function is called from <Book /> that does not have a state.
    var book_id = event.target.id
    var shelf_selected = event.target.value

    event.preventDefault()

    //update server
    BooksAPI.update({id: book_id}, shelf_selected).then(function(responce) {
      BooksAPI.getAll().then( (b) => {
        this.setState({books: b})
      })
    }
  )
}//handleShelfChange()

  componentDidMount() {
    this.getAllBooks()
  }//componentDidMount()

  getAllBooks() {
    BooksAPI.getAll().then( (b) => {
      this.setState({books: b})
    })
  }

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
            <HomePage books={this.state.books}
                      onShelfChange={this.handleShelfChange}/>
          )}
          />
      </div>
    )
  }
}

export default BooksApp
