import React, { ReactNode } from 'react';
import { useEffect } from 'react';

export default function Lockscreen({ children }:{ children: ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-mask-100"
    >
        { children }
    </div>
  )
}