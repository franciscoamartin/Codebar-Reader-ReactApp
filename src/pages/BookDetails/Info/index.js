import React from 'react'
import PropTypes from 'prop-types'
import { Container, Cover } from './styles';
import StarRatings from 'react-star-ratings';

const Info = ({ book }) => {
    return (
        <Container>
            <Cover src={book.coverUrl} />
                <h4 className="name">{book.name}</h4>
                <div className="book-rating">
                    <StarRatings
                        rating={book.rating}
                        starRatedColor="#f1c40f"
                        starDimension="18"
                        starSpacing="0"
                    />
                    {' '} ({book.rating})
                            </div>
                <div className="price">
                    <span className="discount">R$ {Number(book.price).toFixed(2)}</span>{' '}
                                  por <span>R$ {Number(book.promotionalPrice).toFixed(2)}</span>
                </div>
        </Container>
    )
}

Info.propTypes = {
    book: PropTypes.shape({
        name: PropTypes.string,
        rating: PropTypes.number,
        promotionalPrice: PropTypes.number,
        price: PropTypes.number,
        coverUrl: PropTypes.string
    }).isRequired,
}

export default Info
