
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const pixKey = '19.931.626/0001-40'

export default function Generosity() {
  const [copied, setCopied] = useState(false)

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-chumbo-dark text-marfim">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-terracota/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-terracota/10 blur-3xl" />

      <div className="container-page relative z-10 flex min-h-[calc(100vh-80px)] items-center py-12 sm:py-16 md:py-24">
        <div className="grid w-full items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-20">
          
          {/* TEXTO */}
          <div className="min-w-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-terracota sm:mb-6">
              Igreja SôMMA
            </p>

            <h1 className="max-w-full overflow-hidden font-display text-[clamp(3.5rem,11vw,8rem)] font-extrabold leading-[0.85] tracking-tight text-marfim">
              GENEROSIDADE
            </h1>

            <div className="mt-8 h-px w-24 bg-terracota sm:mt-10" />

            <p className="mt-7 max-w-xl text-base leading-relaxed text-marfim/70 md:mt-8 md:text-lg">
              Nossa generosidade é uma expressão de gratidão, amor e
              compromisso com aquilo que Deus está fazendo através da SôMMA.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-marfim/70 md:text-lg">
              Você pode contribuir através do nosso PIX.
            </p>
          </div>

          {/* PIX */}
          <div className="relative min-w-0">
            <div className="border border-marfim/15 bg-marfim/[0.04] p-5 sm:p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-marfim/50 sm:tracking-[0.2em]">
                Contribua através do PIX
              </p>

              <div className="mt-7 sm:mt-8">
                <p className="mb-3 text-sm text-marfim/50">
                  Chave PIX — CNPJ
                </p>

                <div className="border border-marfim/15 bg-marfim px-4 py-4 sm:px-5 sm:py-5">
                  <p className="break-all text-base font-medium tracking-wide text-chumbo-dark sm:text-lg md:text-xl">
                    {pixKey}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPix}
                className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 bg-terracota px-5 py-4 text-sm font-semibold text-marfim transition-all duration-300 hover:bg-terracota/90"
              >
                {copied ? (
                  <>
                    <Check size={18} strokeWidth={2} />
                    Chave PIX copiada
                  </>
                ) : (
                  <>
                    <Copy size={18} strokeWidth={2} />
                    Copiar chave PIX
                  </>
                )}
              </button>

              <p className="mt-5 text-center text-xs leading-relaxed text-marfim/40">
                Ao clicar, a chave PIX será copiada para a área de transferência.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border border-marfim/10 px-5 py-4">
              <span className="text-xs uppercase tracking-[0.16em] text-marfim/40">
                Generosidade
              </span>

              <span className="text-xs text-marfim/40">
                SôMMA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}