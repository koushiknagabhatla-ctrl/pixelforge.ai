import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20"
    >
      {/* Dynamic Grid Background (Static) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center">
        {/* Main Card (Static) */}
        <div className="relative max-w-4xl w-full p-12 glass-card rounded-3xl">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Next-Gen Image Engineering
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              PIXEL <span className="text-gradient">FORGE</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              The high-performance AI engine for rapid image enhancement, high-end upscaling, and professional background removal. Built for precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 h-14 px-10 rounded text-sm font-bold uppercase tracking-widest transition-all"
              >
                Construct Free Account
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-white/10 hover:bg-white/5 h-14 px-10 rounded text-sm font-bold uppercase tracking-widest transition-all"
              >
                Learn Architecture
              </Button>
            </div>
          </div>

          {/* Subtle Glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-white/5 to-transparent rounded-[40px] blur-2xl -z-10 opacity-30" />
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default HeroSection;
