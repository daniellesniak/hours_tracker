import { useState, useEffect } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar, Edit2, Trash2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TimeInput } from '@/components/ui/time-input'
import * as storage from '@/lib/storage'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hours, setHours] = useState([])
  const [timeFrom, setTimeFrom] = useState('')
  const [timeTo, setTimeTo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTimeFrom, setEditTimeFrom] = useState('')
  const [editTimeTo, setEditTimeTo] = useState('')

  const dateStr = format(currentDate, 'yyyy-MM-dd')

  useEffect(() => {
    loadHours()
  }, [currentDate])

  const loadHours = () => {
    const data = storage.getHoursByDate(dateStr)
    setHours(data)
  }

  const handleAddHour = (e) => {
    e.preventDefault()
    if (!timeFrom || !timeTo) return

    storage.addHour(dateStr, timeFrom, timeTo)
    setTimeFrom('')
    setTimeTo('')
    loadHours()
  }

  const handleDeleteHour = (id) => {
    storage.deleteHour(id)
    loadHours()
  }

  const startEdit = (hour) => {
    setEditingId(hour.id)
    setEditTimeFrom(hour.time_from)
    setEditTimeTo(hour.time_to)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTimeFrom('')
    setEditTimeTo('')
  }

  const saveEdit = (id) => {
    storage.updateHour(id, editTimeFrom, editTimeTo)
    setEditingId(null)
    loadHours()
  }

  const calculateMinutes = (from, to) => {
    const [fromHours, fromMinutes] = from.split(':').map(Number)
    const [toHours, toMinutes] = to.split(':').map(Number)
    const fromTotalMinutes = fromHours * 60 + fromMinutes
    const toTotalMinutes = toHours * 60 + toMinutes
    return toTotalMinutes - fromTotalMinutes
  }

  const totalMinutes = hours.reduce((sum, hour) => {
    return sum + calculateMinutes(hour.time_from, hour.time_to)
  }, 0)

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const goToPreviousDay = () => setCurrentDate(subDays(currentDate, 1))
  const goToNextDay = () => setCurrentDate(addDays(currentDate, 1))
  const goToToday = () => setCurrentDate(new Date())

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Hours Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Display and Navigation */}
            <div className="space-y-4">
              {/* Current Date - Always on top on mobile, inline on desktop */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                  {format(currentDate, 'EEEE, MMMM d, yyyy')}
                </h2>

                {/* Navigation controls - Below date on mobile, right side on desktop */}
                <div className="flex items-center justify-center gap-2 md:gap-4">
                  <Button onClick={goToPreviousDay} variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setCurrentDate(new Date(e.target.value))}
                    className="w-auto"
                  />

                  <Button onClick={goToNextDay} variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={goToToday} variant="secondary" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Go to Today
              </Button>
            </div>

            {/* Add Hour Form */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <form onSubmit={handleAddHour} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From</Label>
                      <TimeInput value={timeFrom} onChange={setTimeFrom} required />
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <TimeInput value={timeTo} onChange={setTimeTo} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Hour Entry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Total Hours */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Time Worked:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatMinutes(totalMinutes)} ({totalMinutes} minutes)
                </span>
              </div>
            </div>

            {/* Hours List */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Hour Entries</h3>
              {hours.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hours logged for this day
                </p>
              ) : (
                <div className="space-y-2">
                  {hours.map((hour) => (
                    <Card key={hour.id} className="bg-white">
                      <CardContent className="pt-6">
                        {editingId === hour.id ? (
                          <div className="flex items-center gap-2">
                            <TimeInput
                              value={editTimeFrom}
                              onChange={setEditTimeFrom}
                              className="flex-1"
                            />
                            <span className="text-muted-foreground">—</span>
                            <TimeInput
                              value={editTimeTo}
                              onChange={setEditTimeTo}
                              className="flex-1"
                            />
                            <Button
                              onClick={() => saveEdit(hour.id)}
                              size="icon"
                              variant="default"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={cancelEdit}
                              size="icon"
                              variant="outline"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-mono">
                                {hour.time_from} — {hour.time_to}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({calculateMinutes(hour.time_from, hour.time_to)} minutes)
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => startEdit(hour)}
                                size="icon"
                                variant="outline"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleDeleteHour(hour.id)}
                                size="icon"
                                variant="destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
