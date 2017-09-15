import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    state = {
        searchResults: this.props.books,
        error: ""
    }

    updateQuery = (event) => {
        var query = event.target.value.trim() 
        if (query) {
            BooksAPI.search(query, 10).then(searchResults => {
                if (!searchResults.error) {
                    this.setState({
                        error: "", 
                        searchResults
                    })  
                } else {
                    this.setState({ error: "No books found." })
                }
            })
        }
    }

    render() {
        const { onUpdate } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */
                        }
                        <input type="text" 
                            placeholder="Search by title or author"
                            onChange={ this.updateQuery }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {   this.state.error ?
                            (<strong>{this.state.error}</strong>) :
                            (this.state.searchResults.map(book => {
                                return (
                                    <li key={book.id}>
                                        <Book book={book} onUpdate={onUpdate}/>
                                    </li>)
                                })
                            )                      
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage