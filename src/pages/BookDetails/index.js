import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container } from './styles';
import Info from './Info';
import { getBook } from '../../services/books';
import GeneralScore from './GeneralScore';

function BookDetails() {
    const [book, setBook] = useState({isbn: null});
    const { isbn } = useParams();

    useEffect(() => {
        const loadBook = async () => {
            const response = await getBook(isbn);
            setBook(response);
        };
        loadBook();
    }, [isbn]);

    return (
        <>
            {book.isbn && (
                <Container>
                    <Info book={book} />
                    <GeneralScore book={book}/>
                </Container>
            )}
        </>
    )
}

export default BookDetails
