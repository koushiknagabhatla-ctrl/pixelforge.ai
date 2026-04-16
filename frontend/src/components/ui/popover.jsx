import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../lib/utils"

function Popover(props) { return <PopoverPrimitive.Root data-slot="popover" {...props} /> }
function PopoverTrigger(props) { return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} /> }

function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content align={align} sideOffset={sideOffset}
        className={cn(
          "bg-[#0f0f11]/98 backdrop-blur-2xl text-white/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-xl border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.6)] outline-hidden",
          className
        )} {...props} />
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }) {
  return <div className={cn("flex w-full flex-col gap-1 rounded-t-xl border-b border-white/[0.04] px-3 py-3", className)} {...props} />
}
function PopoverTitle({ className, ...props }) {
  return <p className={cn("text-white font-medium text-sm", className)} {...props} />
}
function PopoverDescription({ className, ...props }) {
  return <p className={cn("text-white/30 text-xs", className)} {...props} />
}
function PopoverFooter({ className, ...props }) {
  return <div className={cn("grid w-full gap-2 rounded-b-xl border-t border-white/[0.04] px-3 py-2", className)} {...props} />
}
function PopoverBody({ children, className, ...props }) {
  return <div className={cn("p-2", className)} {...props}>{children}</div>
}
function PopoverAnchor(props) { return <PopoverPrimitive.Anchor {...props} /> }
function PopoverClose(props) { return <PopoverPrimitive.Close {...props} /> }

export { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverHeader, PopoverTitle, PopoverDescription, PopoverFooter, PopoverAnchor, PopoverClose }
