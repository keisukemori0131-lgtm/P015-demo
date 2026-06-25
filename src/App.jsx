import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// ルートの code splitting（R10 性能）。トップ以外は分割。
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const SupportPage = lazy(() => import('./pages/SupportPage.jsx'))
const CounselingPage = lazy(() => import('./pages/CounselingPage.jsx'))
const CasesPage = lazy(() => import('./pages/CasesPage.jsx'))
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* 旧パス互換（R11-B） */}
          <Route path="/services" element={<Navigate to="/support" replace />} />
          <Route path="/pricing" element={<Navigate to="/support" replace />} />
          <Route path="/company" element={<Navigate to="/about" replace />} />
          <Route path="/access" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
