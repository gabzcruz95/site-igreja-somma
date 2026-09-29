import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Clas from './pages/Clas'
import Events from './pages/Events'
import Store from './pages/Store'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Contact from './pages/Contact'
import Membership from './pages/Membership'
import Volunteer from './pages/Volunteer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main id="conteudo-principal" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<About />} />
          <Route path="/cultos" element={<Services />} />
          <Route path="/clas" element={<Clas />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/loja/produto/:id" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/loja/checkout" element={<Checkout />} />
          <Route path="/loja/confirmacao" element={<OrderConfirmation />} />
          <Route path="/quero-ser-membro" element={<Membership />} />
          <Route path="/quero-servir" element={<Volunteer />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
