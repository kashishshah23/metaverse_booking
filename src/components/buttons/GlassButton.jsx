import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * Shared button used in both wireframes (as an outline ghost) and high‑fi UI (with glow).
 * Use prop variant="wire" for low‑fi, variant="neon" for high‑fi, variant="teal" for custom teal styling.
 */
const GlassButton = forwardRef(function GlassButton(
  { as, to, href, children, className = '', size = 'md', variant = 'neon', ...props }, ref
) {
  const Comp = as || (to ? Link : 'button')
  const sizing = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
  const base = 'inline-flex items-center justify-center rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-neon/50'
  const styles = variant === 'wire'
    ? 'border-white/25 text-white/80 hover:bg-white/5 backdrop-blur-xs'
    : variant === 'teal'
    ? 'glass-teal border-custom-teal/40 text-custom-light hover:shadow-[0_0_28px_rgba(48,125,126,0.4)]'
    : 'glass border-white/30 shadow-glow hover:shadow-[0_0_28px_rgba(0,245,255,0.55)] text-white'

  return (
    <Comp ref={ref} to={to} href={href} className={`${base} ${sizing} ${styles} ${className}`} {...props}>
      {children}
    </Comp>
  )
})

export default GlassButton