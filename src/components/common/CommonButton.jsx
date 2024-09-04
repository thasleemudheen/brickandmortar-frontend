import React from 'react'

export default function CommonButton({ onClick, label,className = '', ...props }) {
  return (
        <button
            className={`px-4 h-10 w-28 py-2 bg-cyan-600 rounded text-white ${className}`}
            onClick={onClick}
            {...props}
        >
            {label}
        </button>
  )
}
