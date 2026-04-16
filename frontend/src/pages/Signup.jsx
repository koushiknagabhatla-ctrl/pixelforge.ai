import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Particles } from '../components/ui/particles';
import { ChevronLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const GoogleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
  </svg>
);

export default function Signup() {
  const { signInWithGoogle, signInWithGithub, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogle = async () => { try { await signInWithGoogle(); } catch (e) { toast.error(e.message); } };
  const handleGithub = async () => { try { await signInWithGithub(); } catch (e) { toast.error(e.message); } };

  return (
    <div className="relative md:h-[calc(100vh-64px)] md:overflow-hidden w-full">
      <Particles color="#a1a1aa" quantity={60} ease={25} size={0.4} className="absolute inset-0" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col justify-center px-6">
        <motion.button whileHover={{ x: -2 }} onClick={() => navigate('/')}
          className="absolute top-6 left-6 text-white/30 hover:text-white/60 transition-colors flex items-center gap-1 text-sm">
          <ChevronLeft className="w-4 h-4" /> Home
        </motion.button>

        <motion.div className="mx-auto space-y-6 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <p className="text-base font-semibold text-white/90 font-headline">Pixel Forge</p>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-headline">Get started</h1>
            <p className="text-white/30 text-sm mt-1">Create a free account in seconds.</p>
          </div>

          <div className="space-y-3 pt-2">
            <motion.button onClick={handleGoogle} disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-3 hover:bg-white/90 transition-all">
              <GoogleIcon className="w-4 h-4" /> Continue with Google
            </motion.button>
            <motion.button onClick={handleGithub} disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 font-semibold text-sm flex items-center justify-center gap-3 hover:bg-white/[0.08] transition-all">
              <FaGithub className="w-4 h-4" /> Continue with GitHub
            </motion.button>
          </div>

          <p className="text-white/15 text-xs pt-4 leading-relaxed">
            By continuing, you agree to our <a href="#" className="text-white/25 underline underline-offset-4">Terms</a> and <a href="#" className="text-white/25 underline underline-offset-4">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
