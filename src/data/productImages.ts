import camisetaPretaFrente from '../assets/images/products/camiseta-preta-frente.jpg'
import camisetaPretaModelo from '../assets/images/products/camiseta-preta-modelo.jpg'
import camisetaPretaDetalhe from '../assets/images/products/camiseta-preta-detalhe.jpg'

import camisetaOffwhiteFrente from '../assets/images/products/camiseta-offwhite-frente.jpg'
import camisetaOffwhiteModelo from '../assets/images/products/camiseta-offwhite-modelo.jpg'
import camisetaOffwhiteDetalhe from '../assets/images/products/camiseta-offwhite-detalhe.jpg'

import camisetaBegeFrente from '../assets/images/products/camiseta-bege-frente.jpg'
import camisetaBegeModelo from '../assets/images/products/camiseta-bege-modelo.jpg'
import camisetaBegeDetalhe from '../assets/images/products/camiseta-bege-detalhe.jpg'

import camisetaAzulMarinhoFrente from '../assets/images/products/camiseta-azul-marinho-frente.jpg'
import camisetaAzulMarinhoModelo from '../assets/images/products/camiseta-azul-marinho-modelo.jpg'
import camisetaAzulMarinhoDetalhe from '../assets/images/products/camiseta-azul-marinho-detalhe.jpg'

import camisetaAzulEscuroFrente from '../assets/images/products/camiseta-azul-escuro-frente.jpg'
import camisetaAzulEscuroDetalhe from '../assets/images/products/camiseta-azul-escuro-detalhe.jpg'

import livroEscadaDaMultiplicacao from '../assets/images/products/livro-escada-da-multiplicacao.jpg'

export const productImages: Record<string, string> = {
  'camiseta-drop-essencial': camisetaPretaFrente,
  'livro-escada-da-multiplicacao': livroEscadaDaMultiplicacao,

}

export const camisetaGalleries: Record<string, string[]> = {
  Preto: [
    camisetaPretaFrente,
    camisetaPretaModelo,
    camisetaPretaDetalhe,
  ],
  'Off White': [
    camisetaOffwhiteFrente,
    camisetaOffwhiteModelo,
    camisetaOffwhiteDetalhe,
  ],
  Bege: [
    camisetaBegeFrente,
    camisetaBegeModelo,
    camisetaBegeDetalhe,
  ],
  'Azul Marinho': [
    camisetaAzulMarinhoFrente,
    camisetaAzulMarinhoModelo,
    camisetaAzulMarinhoDetalhe,
  ],
  'Azul Escuro': [
    camisetaAzulEscuroFrente,
    camisetaAzulEscuroDetalhe,
  ],
}