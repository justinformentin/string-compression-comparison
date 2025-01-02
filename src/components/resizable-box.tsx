import { ReactNode, useEffect, useRef, useState } from 'react'

export default function ResizableBox({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setWidth(rect?.width)
    }
  }, [containerRef])

  useEffect
  return (
    <div ref={containerRef} className="w-full max-w-[1104px]">
      <div className="p-2 inline-block w-auto rounded-md">
        <div className="h-[350px]" style={{ width: `${width}px` }}>
          {width ? children : null}
        </div>
      </div>
    </div>
  )
}
