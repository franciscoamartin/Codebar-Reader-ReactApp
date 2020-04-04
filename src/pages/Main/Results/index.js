import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Wrapper, Cover, Info, ActionButtons } from './styles';
import { getBook } from '../../../services/books';
import StarRatings from 'react-star-ratings';
import { MdArrowForward } from 'react-icons/md';

function Results({ isbn }) {

    const [book, setBook] = useState();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await getBook(isbn);
                setBook(response);
            } catch (e) {
                if (e.response && e.response.status === 404) {
                    console.info('ISBN não encontrado na base de dados.', e);
                    alert('Desculpe, este livro não foi encontrado na nossa base de dados.');
                } else {
                    console.error('Erro ao recuperar os dados do servidor.');
                    alert('Erro ao recuperar os dados do servidor, por favor esteja conectado a Internet.');
                }
            }
        };
        loadBook();
    }, [isbn]);

    return (
        <Container>
            {book && (
                <Link to={`/book-details/${isbn}`}>
                    <Wrapper>
                        <Cover src={book.coverUrl} />
                        <Info>
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
                        </Info>
                        <ActionButtons>
                            <span className="button">
                                <MdArrowForward size={32} color="#fff" />
                            </span></ActionButtons>
                    </Wrapper>
                </Link>
            )}
        </Container>
    );
}
Results.protTypes = {
    isbn: PropTypes.string.isRequired,
};

export default Results;