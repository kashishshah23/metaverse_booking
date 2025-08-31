import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Booking from './pages/Booking.jsx'
import Profile from './pages/Profile.jsx'
import Explore from './pages/Explore.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />   {/* ← this fixes it */}
        </Routes>
      </main>
      <footer className="bg-custom-teal border-t border-custom-teal/80 py-6">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded bg-gradient-to-br from-custom-teal to-cyan-400" />
              <span className="text-sm text-white/80">© {new Date().getFullYear()} MetaBook</span>
            </div>
            <div className="text-sm text-white/60">
              Powered by Metaverse Technology
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}