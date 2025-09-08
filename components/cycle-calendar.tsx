"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react"

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isPeriod: boolean
  isOvulation: boolean
  isFertile: boolean
  symptoms: string[]
}

export function CycleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data for demonstration
  const mockCalendarData: CalendarDay[] = [
    // Previous month days
    ...Array.from({ length: 6 }, (_, i) => ({
      date: 26 + i,
      isCurrentMonth: false,
      isPeriod: i < 2,
      isOvulation: false,
      isFertile: false,
      symptoms: [],
    })),
    // Current month days
    ...Array.from({ length: 30 }, (_, i) => ({
      date: i + 1,
      isCurrentMonth: true,
      isPeriod: i < 5 || (i >= 28 && i < 32),
      isOvulation: i >= 12 && i <= 14,
      isFertile: i >= 10 && i <= 16,
      symptoms: i === 14 ? ["crampes", "fatigue"] : i === 2 ? ["maux de tête"] : [],
    })),
  ]

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const getDayStyle = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return "text-muted-foreground"
    if (day.isPeriod) return "bg-destructive/20 text-destructive font-semibold"
    if (day.isOvulation) return "bg-primary/20 text-primary font-semibold"
    if (day.isFertile) return "bg-accent/20 text-accent-foreground"
    return "hover:bg-muted"
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Calendrier du Cycle
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-destructive/20 rounded"></div>
            <span>Règles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary/20 rounded"></div>
            <span>Ovulation</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent/20 rounded"></div>
            <span>Période fertile</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {mockCalendarData.map((day, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-10 w-full p-1 relative ${getDayStyle(day)}`}
              disabled={!day.isCurrentMonth}
            >
              <span className="text-xs">{day.date}</span>
              {day.symptoms.length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-chart-3 rounded-full"></div>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
