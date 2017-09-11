import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class SearchPage extends Component {
    state = {
        books: [], 
        query: '', 
        error: ''
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateQuery = (event) => {
        this.setState({ query: event.target.value.trim() })
    }

    runSearch = (event) => {
        event.preventDefault()
        if (this.state.query) {
            BooksAPI.search(this.state.query, 10).then(books => {
                if (!books.error) {
                    this.setState({ 
                        error: "",
                        books: books })
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
                <form onSubmit={this.runSearch}>
                    <div className="search-books-bar">
                        <a className="close-search" href="/" >Close</a>
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
                                    value={this.state.query}
                                    onChange={ this.updateQuery }
                             />
                        </div>
                    </div>
                </form>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {   this.state.error ?
                            (<strong>{this.state.error}</strong>) :
                            (this.state.books.map(book => 
                                <li key={book.id}>   
                                    <Book book={book} onUpdate={onUpdate}/>
                                </li> ) )                            
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage