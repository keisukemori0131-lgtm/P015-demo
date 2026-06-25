import { publicUrl } from '../lib/publicUrl.js'
import { REPRESENTATIVE } from '../constants/site.js'

// 代表からのご挨拶（トップ・OUR STUDIO 直下）。
export default function RepresentativeMessage() {
  const { name, image, imageAlt, profile, message } = REPRESENTATIVE

  return (
    <section className="section section--alt">
      <div className="container">
        <div className="rep-message">
          <div className="rep-message__media">
            <img
              src={publicUrl(image)}
              alt={imageAlt}
              width={480}
              height={640}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="rep-message__body">
            <p className="eyebrow">MESSAGE</p>
            <h2 className="section-title rep-message__title">代表からのご挨拶</h2>
            <p className="rep-message__name">{name}</p>

            <div className="rep-message__profile">
              <h3 className="rep-message__profile-heading">プロフィール</h3>
              <ul>
                {profile.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <blockquote className="rep-message__quote">
              <p>{message}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
