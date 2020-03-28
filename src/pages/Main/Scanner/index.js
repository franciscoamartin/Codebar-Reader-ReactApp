import React, { useEffect } from 'react';
import { Video } from './styles';
import Quagga from 'quagga';
import { validateIsbn } from '../../../services/books';

function Scanner() {

  let scannerAttemps = 0;

  const onDetected = result => {
    Quagga.offDetected(onDetected);
    const isbn = result.codeResult.code;
    if (validateIsbn(isbn)) {

      alert(`ISBN válido${isbn}`);
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

  return <Video id="video" />;
}

export default Scanner;
