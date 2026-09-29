// Dados de demonstração da agenda de eventos.
// Estes dados são fictícios e servem apenas para ilustrar o layout da página.
// Preparado para futuramente vir de um banco de dados / painel administrativo.

export interface ChurchEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  image: string
}

export const events: ChurchEvent[] = [
  {
    id: 'noite-de-adoracao',
    name: 'Noite de Adoração',
    date: '[DATA A CONFIRMAR]',
    time: '[HORÁRIO A CONFIRMAR]',
    location: 'Igreja SôMMA — Mauá, SP',
    description: 'Uma noite dedicada à adoração e à presença de Deus em comunidade.',
    image: 'evento-adoracao',
  },
  {
    id: 'encontro-de-clas',
    name: 'Encontro de CLAs',
    date: '[DATA A CONFIRMAR]',
    time: '[HORÁRIO A CONFIRMAR]',
    location: 'Igreja SôMMA — Mauá, SP',
    description: 'Um encontro especial para jovens e adolescentes dos CLAs.',
    image: 'evento-clas',
  },
  {
    id: 'jantar-dos-casais',
    name: 'Jantar dos Casais',
    date: '[DATA A CONFIRMAR]',
    time: '[HORÁRIO A CONFIRMAR]',
    location: 'Igreja SôMMA — Mauá, SP',
    description: 'Uma noite para casais se conectarem através dos discipulados.',
    image: 'evento-casais',
  },
]
