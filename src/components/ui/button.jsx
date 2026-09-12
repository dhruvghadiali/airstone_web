import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#e66f4a] focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-[#292d27] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#3b4237]',
        outline: 'border border-black/15 bg-white/35 text-[#292d27] backdrop-blur-md hover:border-[#e66f4a]/60 hover:bg-white/75',
        ghost: 'text-[#596052] hover:bg-black/[0.055] hover:text-[#242722]',
        accent: 'bg-[#e66f4a] text-[#201d1a] shadow-[0_10px_30px_rgba(184,74,43,.18)] hover:-translate-y-0.5 hover:bg-[#f07e58]',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4 text-xs',
        icon: 'size-11 p-0',
        lg: 'h-13 px-6',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }
