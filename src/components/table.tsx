import { ReactNode } from 'react'

export function Table({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-4">
      <div className="text-lg text-center">{title}</div>
      <table className="mx-auto">{children}</table>
    </div>
  )
}
