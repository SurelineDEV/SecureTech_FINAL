import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Shield, Clock, AlertTriangle, Users, MapPin, Calendar } from 'lucide-react'

// Backend API URL - use relative path when deployed together
const API_URL = '/api'

function Dashboard() {
  const [incidents, setIncidents] = useState([])
  const [schedules, setSchedules] = useState([])
  const { user, logout } = useUser()
  const navigate = useNavigate()

  console.log('Dashboard: Component rendered for user:', user?.email)

  useEffect(() => {
    console.log('Dashboard: Loading dashboard data...')
    if (user) {
      loadDashboardData()
    }
  }, [user])

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Dashboard: Loading data with token:', token ? 'present' : 'missing')

      if (!token) {
        console.log('Dashboard: No token found, cannot load data')
        return
      }

      // Load incidents
      console.log('Dashboard: Fetching incidents...')
      const incidentsResponse = await fetch(`${API_URL}/incidents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (incidentsResponse.ok) {
        const incidentsData = await incidentsResponse.json()
        console.log('Dashboard: Incidents loaded:', incidentsData.incidents?.length || 0)
        setIncidents(incidentsData.incidents || [])
      } else {
        console.log('Dashboard: Failed to load incidents:', incidentsResponse.status)
      }

      // Load schedules
      console.log('Dashboard: Fetching schedules...')
      const schedulesResponse = await fetch(`${API_URL}/schedules`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (schedulesResponse.ok) {
        const schedulesData = await schedulesResponse.json()
        console.log('Dashboard: Schedules loaded:', schedulesData.schedules?.length || 0)
        setSchedules(schedulesData.schedules || [])
      } else {
        console.log('Dashboard: Failed to load schedules:', schedulesResponse.status)
      }
    } catch (err) {
      console.error('Dashboard: Failed to load data:', err)
    }
  }

  // Logout function
  const handleLogout = () => {
    console.log('Dashboard: Logging out user')
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-xl font-bold text-yellow-500">SecureTech</h1>
              <p className="text-sm text-slate-300">{user?.company_name || 'Demo Company'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
              {user?.role?.toUpperCase() || 'DEMO'}
            </Badge>
            <span className="text-sm text-slate-300">{user?.email}</span>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Trial Banner */}
      <div className="bg-orange-600 text-white p-2 text-center text-sm">
        🚀 TRIAL MODE - This is a demonstration environment with dummy data
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {user?.role === 'admin' ? 'Admin Dashboard' : 
             user?.role === 'officer' ? 'Officer Dashboard' : 
             'Client Dashboard'}
          </h2>
          <p className="text-slate-400">
            Welcome back, {user?.email}. Here's your security overview.
          </p>
          <p className="text-yellow-500 text-sm mt-1">
            📊 Company Data Isolation: You can only see data for "{user?.company_name || 'Demo Company'}"
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{incidents.length}</div>
              <p className="text-xs text-slate-400">
                {incidents.filter(i => i.status === 'open').length} open incidents
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Scheduled Shifts</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{schedules.length}</div>
              <p className="text-xs text-slate-400">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Officers Online</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-slate-400">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Incidents */}
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Recent Incidents</CardTitle>
            <CardDescription className="text-slate-400">
              Latest security incidents and reports (filtered by your company)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {incidents.length > 0 ? (
              <div className="space-y-4">
                {incidents.slice(0, 5).map((incident) => (
                  <div key={incident.id} className="flex items-start space-x-4 p-4 bg-slate-700 rounded-lg">
                    <div className="flex-shrink-0">
                      <AlertTriangle className={`h-5 w-5 ${
                        incident.severity === 'high' ? 'text-red-500' :
                        incident.severity === 'medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{incident.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{incident.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {incident.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(incident.timestamp).toLocaleString()}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`${
                            incident.severity === 'high' ? 'border-red-500 text-red-500' :
                            incident.severity === 'medium' ? 'border-yellow-500 text-yellow-500' :
                            'border-green-500 text-green-500'
                          }`}
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">No incidents to display</p>
                <p className="text-yellow-500 text-sm mt-2">
                  🔒 This view is filtered to show only incidents from your company
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role-specific Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">
              {user?.role === 'admin' ? 'Administrative tools and management' :
               user?.role === 'officer' ? 'Officer tools and reporting' :
               'Client portal and communication'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {user?.role === 'admin' && (
                <>
                  <Button className="bg-blue-600 hover:bg-blue-700">Manage Officers</Button>
                  <Button className="bg-green-600 hover:bg-green-700">View Reports</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Scheduling</Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">Settings</Button>
                </>
              )}
              {user?.role === 'officer' && (
                <>
                  <Button className="bg-green-600 hover:bg-green-700">Clock In/Out</Button>
                  <Button className="bg-red-600 hover:bg-red-700">Report Incident</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">View Schedule</Button>
                  <Button className="bg-yellow-600 hover:bg-yellow-700">Emergency</Button>
                </>
              )}
              {user?.role === 'client' && (
                <>
                  <Button className="bg-blue-600 hover:bg-blue-700">View Reports</Button>
                  <Button className="bg-green-600 hover:bg-green-700">Request Coverage</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Contact Admin</Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">Billing</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-slate-800 border border-yellow-500 rounded-lg">
          <h3 className="text-yellow-500 font-bold mb-2">🎭 Demo Environment Notice</h3>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• All data shown is dummy/placeholder data for demonstration</li>
            <li>• Company data isolation is active - you only see your company's data</li>
            <li>• Some features are placeholder buttons for future development</li>
            <li>• This is a secure staging environment (not indexed by search engines)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

