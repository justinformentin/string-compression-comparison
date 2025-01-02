import { ReactNode } from 'react'

export function Table({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="p-2">
      <div className="text-lg text-center mb-4 fixed left-[5%] sm:relative sm:left-0">{title}</div>
      <table className="mx-auto mt-10 sm:mt-0">
        {children}
        </table>
    </div>
  )
}