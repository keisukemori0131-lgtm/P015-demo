import { publicUrl } from '../lib/publicUrl.js'

export default function Logo({ height = 44, className = '', src = '/logo-header.png' }) {
  return (
    <img
      src={publicUrl(src)}
      alt="ペラペラスタジオ"
      height={height}
      style={{ height, width: 'auto', objectFit: 'contain' }}
      className={className}
    />
  )
}
