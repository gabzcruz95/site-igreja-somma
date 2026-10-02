import Button from './Button'
import heroSomma from '../assets/images/hero-somma.jpg'
import { churchInfo } from '../data/services'

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-chumbo-dark">
      <img
  src={heroSomma}
  alt=""
  className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/55 to-chumbo-dark/10" />

      <div className="container-page relative z-10 flex flex-col gap-10 pb-20 pt-40 md:pb-28">
        <h1 className="max-w-3xl font-display text-[13vw] leading-[0.98] text-marfim sm:text-6xl md:text-7xl lg:text-[5.6rem]">
          Um corpo.
          <br />
          Uma família.
          <br />
          Uma essência: <span className="text-terracota">Cristo.</span>
        </h1>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Button to="/quero-ser-membro" variant="primary">
              Quero fazer parte
            </Button>
            <Button to="/quem-somos" variant="ghost">
              Conheça a SôMMA
            </Button>
          </div>

          <div className="flex items-center gap-3 text-marfim/85">
            <div className="h-9 w-px bg-marfim/25" />
            <div className="text-sm leading-tight">
              <p className="font-semibold tracking-wide">
                Próximo culto: {churchInfo.serviceDay} às {churchInfo.serviceTime}
              </p>
              <p className="text-marfim/60">Mauá - SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
