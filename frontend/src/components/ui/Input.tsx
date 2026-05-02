import React from 'react'

export function Input({ 
  label, 
  error, 
  className = '', 
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
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
        <label htmlFor={props?.id || 'input'} className="block text-[10px] font-black text-brand-heading uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-brand-primary z-10">
            <Icon className="h-5 w-5 text-brand-accent/60" />
          </div>
        )}
        <input
          id={props?.id}
          type={rows && rows > 1 ? 'textarea' : type}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`block w-full ${Icon ? 'pl-11' : 'px-4'} ${RightIcon ? 'pr-11' : 'px-4'} py-3.5 bg-brand-bg border ${error ? 'border-brand-error' : 'border-brand-100'} rounded-2xl text-sm font-bold text-brand-heading placeholder:text-brand-text/40 focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary focus:bg-brand-white transition-all ${className}`}
          value={value}
          onChange={onChange}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-text/40 hover:text-brand-primary transition-colors focus:outline-none z-10"
          >
            <RightIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-600 rounded-full" /> {error}
        </p>
      )}
    </div>
  )
}
