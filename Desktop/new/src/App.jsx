// --- Constants & Data ---

const EVENTS = [
  { id: 'paper', icon: '📄', title: 'Paper Presentation', desc: 'Demonstrate research prowess through innovative technical papers.', rules: ['IEEE Manual', 'Max 3 per team.'], details: { team: '2-3', venue: 'Main Hall' } },
  { id: 'expo', icon: '🔬', title: 'Project Expo', desc: 'Bring ideas to life. Showcase innovative projects.', rules: ['Live Demo', 'Working Model.'], details: { team: 'Max 3', venue: 'IT Lab' } },
  { id: 'buzzer', icon: '⚡', title: 'Buzzer Bytes', desc: 'Fast-paced technical quiz.', rules: ['On-spot Quiz', 'Speed Wins.'], details: { team: '1-2', venue: 'Hall A' } },
  { id: 'ui', icon: '🎨', title: 'UI Wave', desc: 'Design stunning user interfaces.', rules: ['Figma/Adobe', 'Originality.'], details: { team: '1', venue: 'Studio' } },
  { id: 'algo', icon: '💻', title: 'Algo-Rythm', desc: 'Solve complex algorithmic challenges.', rules: ['C/C++/Py', 'No Cheating.'], details: { team: '1', venue: 'Lab 1' } },
  { id: 'show', icon: '🏆', title: 'Show-Off', desc: 'Talent show for technocrats.', rules: ['5 Min Style', 'Technical.'], details: { team: '1-2', venue: 'Stage' } },
  { id: 'crew', icon: '🔍', title: 'Crew & Clue', desc: 'Technical treasure hunt.', rules: ['Team Collab', 'Clues.'], details: { team: '4', venue: 'Campus' } },
  { id: 'ipl', icon: '🏏', title: 'IPL Auction', desc: 'Strategy game. Build dream team.', rules: ['Fixed Budget', 'Bidding.'], details: { team: '3', venue: 'Auditorium' } }
]

const COORDINATORS = {
  staff: [
    { name: 'Dr. A. Rajesh', phone: '9750222245', init: 'AR' },
    { name: 'Dr. A. Saritha', phone: '9820305258', init: 'AS' },
    { name: 'Dr. P. Thilakavathy', phone: '9920026608', init: 'PT' },
    { name: 'Mr. N. Udayakumar', phone: '8228777606', init: 'NU' }
  ],
  student: [
    { name: 'Ananya S', phone: '7356666091', init: 'AS' },
    { name: 'Sakthi Priyadharshan', phone: '9345252389', init: 'SP' },
    { name: 'Shiva Sundar P', phone: '7338711301', init: 'SS' },
    { name: 'S. Mohammed Kabir', phone: '9840362703', init: 'MK' },
    { name: 'K.B. Yathindra', phone: '8667669019', init: 'KY' }
  ]
}

// --- UI Components ---

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useMemo(() => {
    const target = new Date('April 09, 2026 09:00:00').getTime()
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const diff = target - now
      if (diff < 0) return clearInterval(timer)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-4 justify-center mt-12 mb-16">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="flex flex-col items-center bg-surface/40 p-3 rounded-lg border border-primary/20 w-20 backdrop-blur-sm">
          <span className="text-3xl font-orbitron font-bold text-primary">{String(val).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase text-gray-500 tracking-widest">{unit}</span>
        </div>
      ))}
    </div>
  )
}

const TiltCard = ({ children, className = "", intensity = 15 }) => {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  )
}

const FlipCard = ({ event }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative w-full h-80 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-surface border border-white/10 p-8 flex flex-col items-start text-left hover:border-primary transition-colors">
          <div className="text-4xl mb-6">{event.icon}</div>
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">Technical</span>
          <h3 className="text-xl font-orbitron font-bold mb-4">{event.title}</h3>
          <p className="text-gray-400 text-sm font-rajdhani">{event.desc}</p>
          <div className="mt-auto text-primary text-xs font-bold flex items-center gap-2">VIEW DETAILS <ChevronRight size={14} /></div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-surface border border-primary p-8 flex flex-col items-start text-left"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-lg font-orbitron font-bold mb-6 text-primary">{event.title}</h3>
          <div className="flex gap-2 mb-6">
            <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase">{event.details.team} Members</span>
            <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase">{event.details.venue}</span>
          </div>
          <ul className="text-xs text-gray-400 space-y-2 mb-8">
            {event.rules.map((r, i) => <li key={i} className="flex gap-2"><span className="text-primary">›</span> {r}</li>)}
          </ul>
          <button 
            className="mt-auto w-full bg-primary py-2 rounded font-orbitron text-[10px] font-bold"
            onClick={(e) => { e.stopPropagation(); alert('Redirecting to Registration...'); }}
          >
            REGISTER NOW
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-lg border-b border-primary/20 px-8 py-4 flex justify-between items-center">
    <div className="font-orbitron font-bold text-xl tracking-widest">
      <span className="text-primary">PRAVESHA</span> <span className="text-secondary">2K26</span>
    </div>
    <div className="hidden md:flex gap-8 font-rajdhani font-semibold uppercase tracking-widest text-sm">
      <a href="#home" className="hover:text-primary transition-colors cursor-pointer">Home</a>
      <a href="#events" className="hover:text-primary transition-colors cursor-pointer">Events</a>
      <a href="#coordinators" className="hover:text-primary transition-colors cursor-pointer">Coordinators</a>
    </div>
  </nav>
)

const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center relative pointer-events-none p-4 pt-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="z-10 w-full max-w-4xl"
    >
      <div className="inline-block border border-secondary text-secondary px-4 py-1 rounded-full text-[10px] font-semibold mb-6 tracking-widest uppercase">
        Department of CSE · VISTAS · Chennai
      </div>
      <h1 className="text-5xl md:text-8xl font-orbitron font-black mb-4 tracking-tighter">
        PRAVESHA <span className="text-primary drop-shadow-[0_0_20px_rgba(229,57,53,0.8)]">2K26</span>
      </h1>
      <p className="text-xs md:text-xl text-gray-400 font-rajdhani tracking-[0.4em] mb-4 uppercase">
        National Level Technical Symposium
      </p>
      
      <Countdown />

      <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
        <button className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded font-orbitron text-[10px] transition-all hover:scale-105 glow-red">
          EXPLORE EVENTS
        </button>
        <button className="border border-secondary text-secondary hover:bg-secondary/10 px-8 py-3 rounded font-orbitron text-[10px] transition-all hover:scale-105 glow-cyan">
          @PRAVESHA_2K26
        </button>
      </div>
    </motion.div>
  </section>
)

const StatsBar = () => (
  <div className="bg-surface/80 backdrop-blur-md border-y border-primary/20 py-12 px-8 flex flex-wrap justify-center gap-12 md:gap-24 relative z-10">
    {[
      { label: 'Events', val: '9+', icon: <Trophy size={20} /> },
      { label: 'Participants', val: '500+', icon: <Users size={20} /> },
      { label: 'Level', val: 'National', icon: <Globe size={20} /> },
      { label: 'Duration', val: '1 Day', icon: <Calendar size={20} /> }
    ].map((s, i) => (
      <div key={i} className="flex items-center gap-4 group">
        <div className="text-primary group-hover:scale-110 transition-transform">{s.icon}</div>
        <div>
          <div className="text-3xl font-orbitron font-black text-primary">{s.val}</div>
          <div className="text-[10px] uppercase text-gray-500 tracking-widest">{s.label}</div>
        </div>
      </div>
    ))}
  </div>
)

const CoordinatorCard = ({ coord, type }) => (
  <TiltCard className="w-full">
    <div className={`bg-surface p-6 border border-white/5 hover:border-${type === 'staff' ? 'primary' : 'secondary'} transition-colors flex items-center gap-6 group`}>
      <div className={`w-12 h-12 rounded-full border-2 border-${type === 'staff' ? 'primary' : 'secondary'} flex items-center justify-center font-orbitron font-bold group-hover:rotate-[360deg] transition-transform duration-500 text-sm`}>
        {coord.init}
      </div>
      <div className="text-left">
        <h4 className="font-orbitron font-bold text-sm mb-1">{coord.name}</h4>
        <p className="text-gray-500 font-rajdhani text-xs">{coord.phone}</p>
      </div>
    </div>
  </TiltCard>
)

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useMemo(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
        style={{ transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)` }}
      />
      <div 
        className="fixed top-0 left-0 w-10 h-10 border border-secondary rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovered ? 1.5 : 1})`,
          borderStyle: 'dashed'
        }}
      />
    </>
  )
}

const Scene = () => {
  const { camera, mouse } = useThree()
  const scroll = useScroll()

  useFrame((state) => {
    // Parallax
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05
    
    // Scroll Fly-in
    const offset = scroll.offset
    camera.position.z = 10 - offset * 20
    camera.lookAt(0, 0, -offset * 10)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#e53935" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00e5ff" />
      <ParticleField />
      <LaserGrid />
      <WireframeGlobe />
      <FloatingShapes />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export default function App() {
  return (
    <div className="relative bg-background text-white min-h-screen scanlines selection:bg-primary/30">
      <CustomCursor />
      {/* 3D Canvas Layer */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.2}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* UI Content Layer */}
      <div className="relative z-10 font-rajdhani">
        <Navbar />
        <Hero />
        <StatsBar />
        
        {/* Events Arena */}
        <section id="events" className="py-32 px-4 max-w-7xl mx-auto text-center">
          <span className="text-secondary font-orbitron text-[10px] tracking-[0.3em] uppercase mb-2 block">Participate & Win</span>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-8">EVENTS <span className="text-primary">ARENA</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16 text-[10px] font-bold tracking-widest uppercase">
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Fee: ₹150 / Event</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-secondary">Combo: ₹200 / 2 Events</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-primary">Last Date: March 26</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map(event => <FlipCard key={event.id} event={event} />)}
          </div>
        </section>

        {/* Command Center */}
        <section id="coordinators" className="py-32 px-4 max-w-7xl mx-auto text-center">
          <span className="text-primary font-orbitron text-[10px] tracking-[0.3em] uppercase mb-2 block">Reach Out to Us</span>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-16">COMMAND <span className="text-primary">CENTER</span></h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-primary font-orbitron font-bold text-xl mb-8 uppercase text-left tracking-widest">Staff Coordinators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COORDINATORS.staff.map((c, i) => <CoordinatorCard key={i} coord={c} type="staff" />)}
              </div>
            </div>
            <div>
              <h3 className="text-secondary font-orbitron font-bold text-xl mb-8 uppercase text-left tracking-widest">Student Coordinators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COORDINATORS.student.map((c, i) => <CoordinatorCard key={i} coord={c} type="student" />)}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-20 px-8 border-t border-primary/20 bg-black/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-20">
            <div>
              <div className="font-orbitron font-bold text-xl mb-6 tracking-widest">
                <span className="text-primary">PRAVESHA</span> <span className="text-secondary">2K26</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">A flagship national level technical symposium organized by the Department of CSE, VISTAS.</p>
            </div>
            <div>
              <h4 className="font-orbitron font-bold mb-6 text-sm underline underline-offset-8 decoration-primary">QUICK LINKS</h4>
              <ul className="text-gray-500 text-sm space-y-4 font-bold">
                <li><a href="#home" className="hover:text-primary transition-colors">HOME</a></li>
                <li><a href="#events" className="hover:text-primary transition-colors">EVENTS</a></li>
                <li><a href="#coordinators" className="hover:text-primary transition-colors">COORDINATORS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-bold mb-6 text-sm underline underline-offset-8 decoration-primary">CONTACT</h4>
              <ul className="text-gray-500 text-sm space-y-4 font-bold">
                <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> pravesha2k26@gmail.com</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +91 7356666091</li>
                <li className="flex items-center gap-3"><Instagram size={16} className="text-primary" /> @PRAVESHA_2K26</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-700 text-[10px] tracking-widest uppercase">
            <p>&copy; 2026 Pravesha Symposium. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ by CSE Department, VISTAS.</p>
          </div>
        </footer>
      </div>

    </div>
  )
}


