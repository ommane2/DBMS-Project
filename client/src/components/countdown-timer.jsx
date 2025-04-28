
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer({ seconds, onComplete, className = "" }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onComplete])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getColorClass = () => {
    if (timeLeft < 60) return "bg-red-100 text-red-800" // Less than 1 minute
    if (timeLeft < 300) return "bg-yellow-100 text-yellow-800" // Less than 5 minutes
    return "bg-violet-100 text-violet-800"
  }

  return (
    <div className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${getColorClass()} ${className}`}>
      <Clock className="mr-1 h-4 w-4" />
      {formatTime(timeLeft)}
    </div>
  )
}
