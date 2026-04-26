import React from 'react'

export function Input({ 
  label, 
  error, 
  className = '', 
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
        <label htmlFor={props?.id || 'input'} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={props?.id}
        type={rows && rows > 1 ? 'textarea' : type}
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
