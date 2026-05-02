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
  const baseClasses = 'inline-flex items-center justify-center border border-transparent font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClasses = {
    default: 'bg-brand-primary text-white hover:bg-brand-primaryHover',
    primary: 'bg-brand-primary text-white hover:bg-brand-primaryHover',
    outline: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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
