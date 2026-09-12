import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@lib/utils'

function Sheet(props) {
  return <SheetPrimitive.Root {...props} />
}

function SheetTrigger(props) {
  return <SheetPrimitive.Trigger {...props} />
}

function SheetClose(props) {
  return <SheetPrimitive.Close {...props} />
}

function SheetTitle({ className, ...props }) {
  return <SheetPrimitive.Title className={cn('text-lg font-semibold tracking-[-0.03em]', className)} {...props} />
}

function SheetDescription({ className, ...props }) {
  return <SheetPrimitive.Description className={cn('text-sm text-[#77836b]', className)} {...props} />
}

function SheetContent({ className, children, ...props }) {
  return <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-[70] bg-[#1b211b]/35 backdrop-blur-sm data-[state=closed]:animate-[fade-out_.2s_ease] data-[state=open]:animate-[fade-in_.2s_ease]" />
    <SheetPrimitive.Content className={cn('fixed inset-y-0 right-0 z-[80] w-[min(88vw,390px)] border-l border-black/10 bg-[#f3f4ee] p-6 shadow-[-24px_0_70px_rgba(35,43,30,.16)] outline-none data-[state=closed]:animate-[sheet-out_.3s_ease-in] data-[state=open]:animate-[sheet-in_.4s_cubic-bezier(.2,.75,.2,1)]', className)} {...props}>
      {children}
      <SheetPrimitive.Close className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-black/10 bg-white/45 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e66f4a]" aria-label="Close navigation"><X className="size-4" /></SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
}

export { Sheet, SheetTrigger, SheetClose, SheetTitle, SheetDescription, SheetContent }
