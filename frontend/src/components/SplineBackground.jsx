import React, { Suspense } from 'react';

// We explicitly lazy load Spline to prevent it from blocking the main thread during Vercel builds or initial CSR render
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 w-full h-[100vh] -z-20 overflow-hidden bg-black pointer-events-auto">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
           <div className="w-10 h-10 border border-white/10 border-t-white/80 rounded-full animate-spin" />
        </div>
      }>
        <Spline scene="https://prod.spline.design/qEw14D1gYJmC1MIF/scene.splinecode" />
      </Suspense>

      {/* Dark vignette overlay to gently obscure borders and keep text perfectly legible */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
    </div>
  );
}
