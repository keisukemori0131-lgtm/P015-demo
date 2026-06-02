import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// ルートの code splitting（R10 性能）。トップ以外は分割。
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const NewsPage = lazy(() => import('./pages/NewsPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="route-fallback">読み込み中…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/company" element={<Navigate to="/services" replace />} />
          <Route path="/access" element={<Navigate to="/services#access" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
