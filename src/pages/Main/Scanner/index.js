import React, { useEffect } from 'react';
import { Video, Container, ScanMarker } from './styles';
import PropTypes from 'prop-types';
import Quagga from 'quagga';
import { validateIsbn } from '../../../services/books';

function Scanner({onScan}) {

    let scannerAttemps = 0;

    const onDetected = result => {
        Quagga.offDetected(onDetected);
        const isbn = result.codeResult.code;
        if (validateIsbn(isbn)) {
            onScan(isbn)
            return;
        } else {
            if (scannerAttemps >= 5) {
                alert("Não é possivel ler o código do livro, tente novamente.")
            }
        }

        scannerAttemps++;
        Quagga.onDetected(onDetected);

    };

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            Quagga.init(
                {
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: document.querySelector("#video"),
                        constraints: {
                            facingMode: 'environment',
                        },
                    },
                    numOfWorkers: 1,
                    locate: true,
                    decoder: {
                        readers: ['ean_reader'],
                    },
                },
                err => {
                    if (err) {
                        console.error(err);
                        alert("Erro ao abrir a câmera do dispositivo, por favor, dê a permissão de uso.");
                        return;
                    }
                    Quagga.start();
                }
            );
            Quagga.onDetected(onDetected);
        }
    }, []);

    return (
        <>
            <Video id="video" />
            <Container>
                <ScanMarker>
                    <img
                        src="../../../assets/scanner.png"
                        alt="Marca do código de leitura"
                        width="260"
                        height="260"
                    />
                    <p className="label">Aponte para o código de barras do livro</p>
                    <img
                        className="logo"
                        src="../../../assets/logo.png"
                        alt="Logo"
                        width="137"
                        height="69"
                    />
                </ScanMarker>
            </Container>
        </>
    );
}


Scanner.propTypes = {
    onScan: PropTypes.func,
};
export default Scanner;