export const churchInfo = {
  name: 'Igreja SôMMA',
  addressLine1: 'Av. Ayrton Senna da Silva, 329',
  addressLine2: 'Jardim Oratório',
  addressLine3: 'Mauá - SP',
  serviceDay: 'Domingo',
  serviceTime: '10h',
  instagram: 'https://www.instagram.com/igreja.somma/',
  instagramHandle: '@igreja.somma',
  whatsapp: '+55 11 91218-7730',
  // Link pronto para uso em botões (wa.me exige apenas dígitos, com código do país).
  whatsappLink: 'https://wa.me/5511912187730',
  email: '[E-MAIL]',
  pastorName: '[NOME DO PASTOR]',
  // A chave Pix aparece publicamente nos Stories em destaque do Instagram da igreja,
  // mas é mantida como placeholder aqui até confirmação final para uso no código
  // (conforme instrução explícita do briefing).
  pixKey: '[CHAVE PIX]',
}

// Textos abaixo extraídos do conteúdo real publicado pela Igreja SôMMA no Instagram
// (destaques "Quem somos" e "Propósito"), fornecidos como referência visual nesta conversa.
export const aboutContent = {
  quemSomos:
    'Somos uma família simples, objetiva e empenhada com a verdade do evangelho. Uma família que expressa o amor de Deus através do evangelho, do amor e do cuidado com pessoas.',
  proposito:
    'Temos a certeza e convicção de que Jesus Cristo é o nosso Criador e Salvador. Um mestre a ser seguido e imitado. Nosso propósito é ser igual a Cristo, provocando uma mudança nas pessoas e, consequentemente, na sociedade.',
}

// Clãs oficiais informados pela igreja. Não inventar líderes, horários ou endereços
// além dos fornecidos — quando um dado não foi passado (ex.: horário de encontro),
// ele simplesmente não é exibido em vez de ser inventado ou marcado como placeholder.
export interface Cla {
  id: string
  name: string
  leader: string
  address: string
}

export const clas: Cla[] = [
  {
    id: 'wesley',
    name: 'Clã Wesley',
    leader: 'Wesley',
    address: 'Rua Goiânia, 133 - Jardim Oratório, Mauá - SP',
  },
  {
    id: 'pedro',
    name: 'Clã Pedro',
    leader: 'Pedro',
    address: 'Rua Ilhéus, 125 - Jardim Oratório, Mauá - SP',
  },
]
