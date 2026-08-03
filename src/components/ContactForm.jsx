import { useState } from 'react'
import { submitInquiry } from '../lib/upnote.js'

// UpNote 問い合わせ API フォーム（R6-upnote / 公開API設計書 v1.1 §7.3）
// 認証はコンテンツ取得と同じ公開 API キー。送信先メールは UpNote 側で管理。
// 制限: name 100 / email 255 / subject 200(任意) / message 5000 文字以内

const LIMITS = { name: 100, email: 255, subject: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'お名前を入力してください。'
  else if (values.name.length > LIMITS.name) errors.name = `お名前は${LIMITS.name}文字以内で入力してください。`

  if (!values.email.trim()) errors.email = 'メールアドレスを入力してください。'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'メールアドレスの形式が正しくありません。'
  else if (values.email.length > LIMITS.email) errors.email = `メールアドレスは${LIMITS.email}文字以内で入力してください。`

  if (values.subject.length > LIMITS.subject) errors.subject = `件名は${LIMITS.subject}文字以内で入力してください。`

  if (!values.message.trim()) errors.message = 'お問い合わせ内容を入力してください。'
  else if (values.message.length > LIMITS.message)
    errors.message = `お問い合わせ内容は${LIMITS.message}文字以内で入力してください。`

  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // スパム対策（R6）: honeypot に値が入っていたら送信せず成功扱い
    if (honeypot) {
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    setErrorMessage('')
    try {
      await submitInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        ...(values.subject.trim() ? { subject: values.subject.trim() } : {}),
        message: values.message.trim(),
      })
      setStatus('success')
      setValues(INITIAL)
    } catch (err) {
      // 失敗時はフォーム入力値を消さない（R6: そのまま再送できるようにする）
      setStatus('error')
      if (err?.errorCode === 'VALIDATION_ERROR') {
        setErrorMessage('入力内容に不備があります。各項目をご確認のうえ、再度送信してください。')
      } else {
        setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。')
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form__done" role="status">
        <h3>送信が完了しました</h3>
        <p>
          お問い合わせありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
          お急ぎの場合はお電話にてお問い合わせください。
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="contact-name">
          お名前 <span className="contact-form__required">必須</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p className="contact-form__error" id="contact-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">
          メールアドレス <span className="contact-form__required">必須</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email ? (
          <p className="contact-form__error" id="contact-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-subject">件名（任意）</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={LIMITS.subject}
          value={values.subject}
          onChange={handleChange}
          placeholder="例）見学の申し込み"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        />
        {errors.subject ? (
          <p className="contact-form__error" id="contact-subject-error">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">
          お問い合わせ内容 <span className="contact-form__required">必須</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={8}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <p className="contact-form__error" id="contact-message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* honeypot（スパム対策・R6）: 人間には見えない。入力があれば送信しない */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="contact-company">会社名</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && errorMessage ? (
        <p className="contact-form__error contact-form__error--global" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? '送信中…' : '送信する'}
      </button>
      <p className="contact-form__note">
        送信いただいた内容は担当者へメールで通知されます。通常2〜3営業日以内にご返信いたします。
      </p>
    </form>
  )
}
