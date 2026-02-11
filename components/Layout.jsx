import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto px-2 sm:px-4 py-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}