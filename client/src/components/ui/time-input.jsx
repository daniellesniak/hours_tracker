import * as React from "react"
import { cn } from "@/lib/utils"

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))

const TimeInput = React.forwardRef(({ className, value, onChange, ...props }, ref) => {
  const [h, m] = value ? value.split(':') : ['', '']

  const handleChange = (newH, newM) => {
    if (newH && newM) {
      onChange(`${newH}:${newM}`)
    } else if (!newH && !newM) {
      onChange('')
    }
  }

  const selectClass =
    "h-10 rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"

  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
      <select
        value={h}
        onChange={(e) => handleChange(e.target.value, m || '00')}
        className={cn(selectClass, "flex-1")}
        required={props.required}
      >
        <option value="" disabled>HH</option>
        {hours.map((hour) => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      <span className="text-lg font-semibold">:</span>
      <select
        value={m}
        onChange={(e) => handleChange(h || '00', e.target.value)}
        className={cn(selectClass, "flex-1")}
        required={props.required}
      >
        <option value="" disabled>MM</option>
        {minutes.map((min) => (
          <option key={min} value={min}>{min}</option>
        ))}
      </select>
    </div>
  )
})
TimeInput.displayName = "TimeInput"

export { TimeInput }
