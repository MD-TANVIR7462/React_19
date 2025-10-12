import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hourglass, XCircle, PackageOpen, TrendingUp, Users, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const dashboardData = {
  pendingCount: 12,
  canceledCount: 5,
  totalCount: 150,
  completedCount: 133,
  avgProcessingTime: "2.5",
  customerSatisfaction: 4.8,
  weeklyTrend: [
    { day: "Mon", orders: 18, completed: 15 },
    { day: "Tue", orders: 22, completed: 19 },
    { day: "Wed", orders: 25, completed: 22 },
    { day: "Thu", orders: 20, completed: 18 },
    { day: "Fri", orders: 28, completed: 25 },
    { day: "Sat", orders: 24, completed: 21 },
    { day: "Sun", orders: 16, completed: 13 },
  ],
  statusDistribution: [
    { name: "Pending", value: 12, color: "#f97316" }, // Orange
    { name: "Canceled", value: 5, color: "#dc2626" }, // Red
    { name: "Completed", value: 133, color: "#16a34a" }, // Green
    { name: "In Progress", value: 8, color: "#2563eb" }, // Blue
  ],
  performanceMetrics: {
    completionRate: 88.7,
    growth: 12.5,
    onTimeDelivery: 94.2,
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardStats = () => {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Awaiting Pickup Card */}
        <Card className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Awaiting Pickup</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.pendingCount}</p>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-gray-500">Avg: {dashboardData.avgProcessingTime}h</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Hourglass className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={dashboardData.weeklyTrend}>
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#f97316" 
                    fill="#f97316" 
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cancelled Orders Card */}
        <Card className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Cancelled Orders</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.canceledCount}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-gray-500">{((dashboardData.canceledCount / dashboardData.totalCount) * 100).toFixed(1)}% of total</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <BarChart data={dashboardData.statusDistribution}>
                  <Bar 
                    dataKey="value" 
                    fill="#dc2626" 
                    radius={[2, 2, 0, 0]}
                    fillOpacity={0.8}
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders Card */}
        <Card className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalCount}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-gray-500">↑ {dashboardData.performanceMetrics.growth}% growth</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <PackageOpen className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <PieChart>
                  <Pie
                    data={dashboardData.statusDistribution}
                    innerRadius={12}
                    outerRadius={20}
                    paddingAngle={1}
                    dataKey="value"
                  >
                    {dashboardData.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Card */}
        <Card className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.performanceMetrics.completionRate}%</p>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-gray-500">{dashboardData.customerSatisfaction}/5 satisfaction</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={dashboardData.weeklyTrend}>
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#16a34a" 
                    fill="#16a34a" 
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview Card */}
      <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
            Weekly Order Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.weeklyTrend}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="orders" 
                name="Total Orders" 
                fill="#f97316" 
                radius={[2, 2, 0, 0]} 
                fillOpacity={0.8}
              />
              <Bar 
                dataKey="completed" 
                name="Completed" 
                fill="#16a34a" 
                radius={[2, 2, 0, 0]} 
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;