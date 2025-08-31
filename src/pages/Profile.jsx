import GlassButton from '../components/buttons/GlassButton.jsx'

export default function Profile() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-custom-teal rounded-2xl border border-custom-teal/80 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-1 text-white">Your Profile</h2>
        <p className="text-white/80 mb-6">Manage tickets, wallets, and preferences.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-custom-teal rounded-2xl border border-custom-teal/80 p-4 shadow-lg">
            <h3 className="font-semibold mb-2 text-white">Upcoming Tickets</h3>
            <ul className="text-white/80 text-sm list-disc pl-5 space-y-1">
              <li>Neon Nights Festival — Sep 21</li>
              <li>VRTech Summit — Nov 12</li>
            </ul>
          </div>
          <div className="bg-custom-teal rounded-2xl border border-custom-teal/80 p-4 shadow-lg">
            <h3 className="font-semibold mb-2 text-white">Wallet</h3>
            <p className="text-white/80 text-sm">Status: Not connected</p>
            <GlassButton variant="teal" className="mt-3">Connect Wallet</GlassButton>
          </div>
        </div>
      </div>
    </section>
  )
}