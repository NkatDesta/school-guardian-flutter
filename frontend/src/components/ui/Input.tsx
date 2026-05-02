import React from 'react'

export function Input({ 
  label, 
  error, 
  className = '', 
  icon: Icon,
  rows,
  type = 'text',
  placeholder,
  required,
  disabled,
  value,
  onChange,
  ...props 
}: any) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props?.id || 'input'} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-brand-primary">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={props?.id}
          type={rows && rows > 1 ? 'textarea' : type}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`block w-full ${Icon ? 'pl-10' : 'px-3'} py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all ${className}`}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-600 rounded-full" /> {error}
        </p>
      )}
    </div>
  )
}
