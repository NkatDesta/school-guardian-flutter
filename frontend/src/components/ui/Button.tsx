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
  const baseClasses = 'btn'
  const variantClasses = {
    default: 'btn-primary',
    primary: 'btn-primary',
    outline: 'btn-outline'
  }
  const sizeClasses = {
    default: '',
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
