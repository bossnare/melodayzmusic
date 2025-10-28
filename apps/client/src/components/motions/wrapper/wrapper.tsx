import {motion} from 'motion/react'
import type {BaseProps} from '@/types/base.interface'

export const Wrapper = ({children}: BaseProps) => {
  return (
    <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 50,
                    mass: 1.2,
                  }}
                  className="space-y-4">
                    {children}
      
    </motion.div>
  )
}