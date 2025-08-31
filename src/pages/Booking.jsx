import { useParams } from 'react-router-dom'
import GlassButton from '../components/buttons/GlassButton.jsx'

export default function Booking() {
  const { id } = useParams()
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">
      <div className="glass p-4">
        <div className="aspect-video rounded-xl bg-white/5 border border-white/10 grid place-items-center mb-4">
          <span className="text-white/50">Seat Map (placeholder)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_,i) => (
            <button key={i} className="glass py-3 text-sm hover:shadow-glow transition">A{i+1}</button>
          ))}
        </div>
      </div>
      <div className="glass p-6 h-max">
        <h2 className="text-xl font-semibold mb-4">Booking • {id}</h2>
        <div className="space-y-3 text-white/80">
          <div className="flex justify-between"><span>Ticket</span><span>General</span></div>
          <div className="flex justify-between"><span>Qty</span><span>1</span></div>
          <div className="flex justify-between"><span>Total</span><span>$29</span></div>
        </div>
        <GlassButton className="mt-6 w-full">Pay with Wallet</GlassButton>
      </div>
    </section>
  )
}