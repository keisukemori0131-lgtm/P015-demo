import { publicUrl } from '../lib/publicUrl.js'

export default function Logo({ height = 44, className = '', src = '/logo.svg' }) {
  return (
    <img
      src={publicUrl(src)}
      alt="ペラペラキッズカレッジ札幌"
      height={height}
      style={{ height, width: 'auto', objectFit: 'contain' }}
      className={className}
    />
  )
}
