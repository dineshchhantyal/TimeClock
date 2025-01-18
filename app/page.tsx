import { Header } from '@/components/header/Header'
import { currentUser } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole } from '@prisma/client'
import Link from 'next/link'
import { Clock, Users, Calendar, Settings, BarChart, UserCog } from 'lucide-react'
import { getPermittedDepartmentsInfo } from '@/actions/department'
import { TimeClock } from '@/components/TimeClock'

const HomePage = async () => {
    const user = await currentUser()

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
                <main className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-block p-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-4">
                            ⚡️ Simple Time Management Solution
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                            Welcome to <span className="text-orange-600">TimeClock</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Streamline your time tracking and management with our modern solution. Built for teams who value simplicity and efficiency.
                        </p>
                        <div className="flex justify-center gap-4 pt-6">
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                                <Link href="/auth/login">Get Started</Link>
                            </Button>
                            <Button variant="outline" size="lg">
                                <Link href="/auth/login">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    if (!user.id) throw new Error("User ID is required");
    const permittedDepartments = await getPermittedDepartmentsInfo(user.id);
    const isAdmin = user.role === UserRole.ADMIN || (permittedDepartments.departments ?? []).length != 0;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Welcome Section with Stats */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Welcome back, {user.name}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Here's your workspace overview
                                </p>
                            </div>
                            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                                <Link href="/dashboard">
                                    Go to Dashboard
                                </Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-orange-50 rounded-lg p-4">
                                <p className="text-orange-600 text-sm font-medium">Total Hours</p>
                                <p className="text-2xl font-bold text-gray-900">32.5h</p>
                                <p className="text-sm text-gray-600">This week</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                                <p className="text-green-600 text-sm font-medium">Last Clock In</p>
                                <p className="text-2xl font-bold text-gray-900">9:00 AM</p>
                                <p className="text-sm text-gray-600">Today</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-blue-600 text-sm font-medium">Departments</p>
                                <p className="text-2xl font-bold text-gray-900">{permittedDepartments.departments?.length || 0}</p>
                                <p className="text-sm text-gray-600">Active</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2 md:row-span-2">
                            <TimeClock departments={permittedDepartments.departments ?? []} />
                        </div>

                        <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white flex flex-col justify-between">
                            <Link href="/dashboard?tab=schedule" className="h-full flex flex-col">
                                <CardHeader className="flex-1">
                                    <CardTitle className="flex items-center gap-2 group-hover:text-orange-600 transition-colors">
                                        <Calendar className="h-5 w-5 text-orange-600" />
                                        Schedule
                                    </CardTitle>
                                    <CardDescription className="mt-4">
                                        View and manage your work schedule. Plan your shifts and keep track of your working hours efficiently.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pb-6">
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                        View Schedule
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-white flex flex-col justify-between">
                            <Link href="/dashboard?tab=timesheet" className="h-full flex flex-col">
                                <CardHeader className="flex-1">
                                    <CardTitle className="flex items-center gap-2 group-hover:text-orange-600 transition-colors">
                                        <BarChart className="h-5 w-5 text-orange-600" />
                                        Time Sheets
                                    </CardTitle>
                                    <CardDescription className="mt-4">
                                        Review and submit time sheets. Track your working hours and manage your time records with ease.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pb-6">
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                        View Timesheets
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>

                    {/* Admin Section with improved styling */}
                    {isAdmin && (
                        <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm border">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Settings className="h-6 w-6 text-orange-600" />
                                Administrative Tools
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Department Management
                                        </CardTitle>
                                        <CardDescription>
                                            Manage departments and employees
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button className="w-full" asChild>
                                            <Link href="/admin/dashboard?tab=departments">
                                                Manage Departments
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <UserCog className="h-5 w-5" />
                                            Employee Management
                                        </CardTitle>
                                        <CardDescription>
                                            Manage user accounts and permissions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button className="w-full" asChild>
                                            <Link href="/admin/dashboard?tab=employees">
                                                Manage Employees
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default HomePage