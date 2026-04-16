import React from 'react';
import { cn } from "../../lib/utils";

export const AnimatedBorderCard = ({ children, className }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full p-[2px] group">
      
      {/* Glow Layer 1 */}
      <div className="absolute z-0 overflow-hidden h-full w-full rounded-2xl blur-[3px] 
                      before:absolute before:content-[''] before:z-[-2] before:w-[300%] before:aspect-square before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                      before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:transition-all before:duration-1000
                      group-hover:before:rotate-[-120deg]">
      </div>
      
      {/* Glow Layer 2 */}
      <div className="absolute z-0 overflow-hidden h-full w-full rounded-2xl blur-[3px] 
                      before:absolute before:content-[''] before:z-[-2] before:w-[300%] before:aspect-square before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                      before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:transition-all before:duration-1000
                      group-hover:before:rotate-[-98deg]">
      </div>

       {/* Glow Layer 3 */}
       <div className="absolute z-0 overflow-hidden h-full w-full rounded-2xl blur-[2px] 
                      before:absolute before:content-[''] before:z-[-2] before:w-[300%] before:aspect-square before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                      before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:brightness-125
                      before:transition-all before:duration-1000 group-hover:before:rotate-[-97deg]">
      </div>

      {/* Sharper Inner Layer */}
      <div className="absolute z-0 overflow-hidden h-full w-full rounded-2xl blur-[0.5px] 
                      before:absolute before:content-[''] before:z-[-2] before:w-[300%] before:aspect-square before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                      before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:brightness-125
                      before:transition-all before:duration-1000 group-hover:before:rotate-[-110deg]">
      </div>

      <div className={cn("relative z-10 w-full h-full bg-[#010201] rounded-2xl", className)}>
        {children}
      </div>
    </div>
  );
};
