import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center border border-transparent font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]'
  const variantClasses = {
    default: 'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/20',
    primary: 'bg-brand-primary text-white hover:bg-brand-primaryHover shadow-lg shadow-brand-primary/20',
    outline: 'bg-brand-white text-brand-secondary border-brand-100 hover:bg-brand-bg'
  }
  const sizeClasses = {
    default: 'px-4 py-2 text-sm',
    sm: 'text-xs px-3 py-1',
    lg: 'text-lg px-6 py-3'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
