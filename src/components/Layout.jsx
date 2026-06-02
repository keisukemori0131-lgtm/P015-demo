import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollReveal from './ScrollReveal.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
