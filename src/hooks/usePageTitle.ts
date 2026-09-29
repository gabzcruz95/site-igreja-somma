import { useEffect } from 'react'

const SITE_NAME = 'Igreja SôMMA'

/**
 * Define o <title> da página. Como o site é uma SPA (sem SSR), isso cobre
 * o requisito de "title por página" para navegação/abas do navegador e
 * compartilhamento manual; o title padrão (index.html) cobre o carregamento inicial.
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    return () => {
      document.title = previous
    }
  }, [title])
}
