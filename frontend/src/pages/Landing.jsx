import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlinePresentationChartBar } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { SiVercel } from 'react-icons/si'
import useAuthStore from '../store/useAuthStore'

const revealVariant = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Landing() {
  const { user } = useAuthStore()

  const tools = [
    { title: 'Image Generation', icon: HiOutlineSparkles, desc: 'Create stunning images from simple text descriptions.' },
    { title: 'Image Enhancer', icon: HiOutlineLightningBolt, desc: 'Make your images clearer and sharper instantly.' },
    { title: 'Chat with AI', icon: HiOutlineGlobeAlt, desc: 'Have a natural conversation to help with your projects.' },
    { title: 'Simple Analytics', icon: HiOutlinePresentationChartBar, desc: 'Track your usage and results with ease.' }
  ]

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white/10 font-sans overflow-hidden">
      {/* Background */}
      <div className="bg-animated" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6">
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="relative z-10 w-full max-w-4xl text-center"
        >
            <motion.div variants={revealVariant} className="mb-8">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">Simple & Powerful</span>
            </motion.div>

            <motion.h1 
               variants={revealVariant}
               className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
            >
               Build your ideas <br /> with <span className="text-gray-400">Pixel Forge</span>
            </motion.h1>

            <motion.p 
               variants={revealVariant}
               className="text-sm md:text-base text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
                Professional AI tools for everyone. Generate images, enhance quality, and chat with AI in a simple, fast workspace.
            </motion.p>

            <motion.div 
              variants={revealVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <Link 
                  to={user ? "/chatbot" : "/login"}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-black text-[12px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Get Started <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
                
                <a 
                  href="#about"
                  className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white text-[12px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center"
                >
                  Learn More
                </a>
            </motion.div>
        </motion.div>
      </section>

      {/* Simple Tools Section */}
      <section id="about" className="relative py-32 px-6 lg:px-20 max-w-6xl mx-auto">
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
              <div className="space-y-8 md:sticky md:top-32 h-fit">
                  <motion.div variants={revealVariant}>
                      <h2 className="text-3xl md:text-5xl font-black mb-6">Simple Tools. <br /> Real Results.</h2>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                          We believe AI should be easy to use. Pixel Forge removes the complexity so you can focus on creating.
                      </p>
                  </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  {tools.map((tool) => (
                      <motion.div 
                        key={tool.title}
                        variants={revealVariant}
                        className="glass p-8 flex items-center gap-6 group hover:border-white/20 transition-all duration-300"
                      >
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                              <tool.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold mb-1">{tool.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {tool.desc}
                            </p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </motion.div>
      </section>

      {/* Final Section */}
      <section className="py-32 px-6">
        <motion.div 
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="max-w-3xl mx-auto glass p-16 md:p-24 rounded-[2rem] text-center"
        >
            <motion.h3 variants={revealVariant} className="text-4xl md:text-5xl font-black mb-8 italic">Ready to build?</motion.h3>
            <motion.p variants={revealVariant} className="text-sm text-gray-500 mb-12">
                Join our community of creators and start using Pixel Forge today.
            </motion.p>
            <motion.div variants={revealVariant}>
              <Link 
                to="/signup" 
                className="inline-block px-12 py-4 bg-white text-black text-[12px] font-bold uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Sign Up Now
              </Link>
            </motion.div>
        </motion.div>
      </section>

      {/* 👨‍💻 DEVELOPER FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-600">Developed By</h4>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl font-black text-white">Koushik</span>
                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Full-Stack Engineer</span>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                  <a 
                    href="https://github.com/koushiknagabhatla-ctrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 glass rounded-xl hover:bg-white hover:text-black transition-all group"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">GitHub</span>
                  </a>

                  <a 
                    href="https://koushikportfolio-peach.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 glass rounded-xl hover:bg-white hover:text-black transition-all group"
                  >
                    <SiVercel className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Portfolio</span>
                  </a>
              </div>

              <div className="text-center md:text-right">
                  <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                      &copy; 2026 Pixel Forge AI. <br /> All Rights Reserved.
                  </p>
              </div>
          </div>
      </footer>
    </div>
  )
}
