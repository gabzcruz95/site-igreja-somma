// Produtos oficiais informados pela igreja.
// Nenhuma foto oficial dos produtos foi recebida nesta conversa ainda —
// por isso a loja usa PhotoPlaceholder no lugar de <img>. Assim que os
// arquivos de imagem forem enviados, basta importá-los e substituir o
// campo "image" por um <img src={...}> nos componentes ProductCard/Product.

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'camisetas' | 'livros'
  image: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 'camiseta-drop-essencial',
    name: 'Camiseta do Drop Essencial',
    description:
      'Camiseta oficial do drop ESSENCIAL da Igreja SôMMA. Disponível em 5 cores e 4 tamanhos.',
    price: 89.9,
    category: 'camisetas',
    image: 'camiseta-drop-essencial',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Off White', 'Bege', 'Azul Marinho', 'Azul Escuro'],
    inStock: true,
  },
  {
    id: 'livro-escada-da-multiplicacao',
    name: 'A Escada da Multiplicação',
    description: 'Livro de Wilson Oliveira da Silva.',
    price: 29.99,
    category: 'livros',
    image: 'livro-escada-da-multiplicacao',
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
