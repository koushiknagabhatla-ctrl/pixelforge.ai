import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
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

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative md:h-[calc(100vh-80px)] md:overflow-hidden w-full">
      <Particles
        color="#818cf8"
        quantity={80}
        ease={20}
        size={0.5}
        className="absolute inset-0"
      />
      <div aria-hidden className="absolute inset-0 isolate -z-10 contain-strict pointer-events-none">
        <div className="absolute bottom-0 right-0 h-[500px] w-[300px] translate-y-1/2 rotate-45 rounded-full bg-[radial-gradient(68%_69%_at_55%_31%,rgba(99,102,241,0.08)_0,rgba(99,102,241,0.02)_50%,rgba(99,102,241,0.01)_80%)]" />
        <div className="absolute top-0 left-0 h-[500px] w-[200px] -translate-y-1/2 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,0.05)_0,rgba(99,102,241,0.01)_80%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col justify-center px-6">
        <Button variant="ghost" className="absolute top-4 left-4 text-white/50 hover:text-white hover:bg-white/5" onClick={() => navigate('/')}>
          <ChevronLeft className="mr-1 w-4 h-4" />
          Home
        </Button>

        <div className="mx-auto space-y-6 w-full max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-lg font-bold text-white font-['Manrope'] tracking-tight">Pixel Forge</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-['Manrope']">
              Create Your Account
            </h1>
            <p className="text-white/40 text-sm">
              Join the neural creative platform.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              <GoogleIcon className="w-4 h-4" />
              Continue with Google
            </button>
            <button
              onClick={handleGithubSignup}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-semibold text-sm flex items-center justify-center gap-3 hover:bg-white/[0.1] transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <FaGithub className="w-4 h-4" />
              Continue with GitHub
            </button>
          </div>

          <p className="text-white/25 text-xs pt-4">
            By clicking continue, you agree to our{' '}
            <a href="#" className="hover:text-indigo-300 underline underline-offset-4 text-white/40">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="hover:text-indigo-300 underline underline-offset-4 text-white/40">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
