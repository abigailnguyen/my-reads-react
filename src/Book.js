import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired
    }

    state = {
        shelf:""
    }
    
    componentDidMount() {
       if (!this.state.shelf) {
            BooksAPI.get(this.props.book.id).then(book => {
                this.setState({ shelf: book.shelf })
            })
       } 
    }

    updateToShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(response => {
            console.log(response)
        }).then(() => {
            this.setState({ shelf: shelf })
            this.props.onUpdate()
        })
    }
    
    render() {
        const { book } = this.props
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} 
                                onChange={event => {  
                                    this.updateToShelf(book, event.target.value)
                                }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{ book.authors && book.authors.join(' & ')}</div>
            </div>
        )
    }
}

export default Book