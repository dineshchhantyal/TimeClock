'use client'

import { TimeClock } from '@/components/TimeClock'
import { Calendar } from '@/components/Calendar'
import { TimeEntryList } from '@/components/TimeEntryList'
import { StatisticsCards } from '@/components/StatisticsCards'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTimeEntry } from '@/_context/TimeEntryContext'

function Dashboard() {
  const { recentEntries } = useTimeEntry()

  return (
    <div className="space-y-6 my-6 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TimeClock />
        <Calendar />
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white">Submit Timesheet</Button>
            <Button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white">Request Time Off</Button>
            <Button className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white">View Pay Information</Button>
            <Button className="w-full bg-gradient-to-r from-purple-400 to-red-500 text-white">Create Department</Button>
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Approve Timesheets</Button>
            <Button className="w-full bg-gradient-to-r from-gray-400 to-black-500 text-white">Manage Departments</Button>
          </CardContent>
        </Card>
      </div>
      <StatisticsCards entries={recentEntries} />
      <TimeEntryList entries={recentEntries} />
    </div>
  )
}



export default Dashboard