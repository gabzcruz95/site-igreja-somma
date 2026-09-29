import camisetaDropEssencial from '../assets/images/products/camiseta-drop-essencial.jpg'
import camisetaDetalheBordado from '../assets/images/products/camiseta-detalhe-bordado.jpg'
import camisetaCostas from '../assets/images/products/camiseta-costas.jpg'
import livroEscadaDaMultiplicacao from '../assets/images/products/livro-escada-da-multiplicacao.jpg'

// Fotos oficiais recebidas do cliente. A camiseta foi fotografada em uma
// única cor (bege/off-white); as demais cores (Preto, Bege, Azul Marinho,
// Azul Escuro) ainda não têm foto própria, então todas mostram esta mesma
// imagem até que fotos por cor sejam enviadas.
export const productImages: Record<string, string> = {
  'camiseta-drop-essencial': camisetaDropEssencial,
  'livro-escada-da-multiplicacao': livroEscadaDaMultiplicacao,
}

export const camisetaGallery = [camisetaDropEssencial, camisetaDetalheBordado, camisetaCostas]
