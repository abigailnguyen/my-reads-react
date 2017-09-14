import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  
  componentDidMount() {
    this.updateBooks()
  }
  
  updateBooks = () => {
    let currentlyReading = [],
        wantToRead =  [],
        read = []
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        if (book.shelf === "currentlyReading") {
          currentlyReading.push(book)
        } else if (book.shelf === "wantToRead") {
          wantToRead.push(book)
        } else if (book.shelf === "read") {
          read.push(book)
        }
      })
      this.setState({
        books,
        currentlyReading,
        wantToRead,
        read
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" books={this.state.currentlyReading} onUpdate={this.updateBooks}/> 
                <BookShelf title="Want To Read" books={this.state.wantToRead} onUpdate={this.updateBooks}/> 
                <BookShelf title="Read" books={this.state.read} onUpdate={this.updateBooks}/> 
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Search Page</Link>
            </div>
          </div>  
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchPage books={this.state.books} onUpdate={this.updateBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
