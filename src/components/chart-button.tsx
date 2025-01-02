import { ReactNode } from 'react'

export function ChartButton({
  active,
  children,
  onClick,
  color,
}: {
  active: boolean
  color: string
  children: ReactNode
  onClick: () => void
}) {
  const colors = {
    sky: { bg: 'bg-sky-700', border: 'border-sky-700' },
    teal: { bg: 'bg-teal-700', border: 'border-teal-700' },
    indigo: { bg: 'bg-indigo-700', border: 'border-indigo-700' },
  }[color]

  const activeClass = active ? `${colors?.bg} text-white` : ''
  return (
    <button
      className={`border inline-flex text-xs font-semibold items-center justify-center rounded-md text-sm font-medium h-7 px-2 hover:opacity-70 ${colors?.border} ${activeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
