"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

export default function DashboardChart({ products }: { products: any[] }) {
  // Data for Bar Chart
  const barData = products.slice(0, 6).map(p => ({ name: p.name, stock: p.stock }));
  
  // Data for Pie Chart
  const categoryData: any = {};
  products.forEach(p => {
    const cat = p.category || "Other";
    categoryData[cat] = (categoryData[cat] || 0) + 1;
  });
  const pieData = Object.keys(categoryData).map(key => ({ name: key, value: categoryData[key] }));
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Data for Sales Line Chart (Simulated for Demo)
  const salesData = [
    { day: 'Mon', sales: 4 }, { day: 'Tue', sales: 8 }, { day: 'Wed', sales: 6 },
    { day: 'Thu', sales: 9 }, { day: 'Fri', sales: 3 }, { day: 'Sat', sales: 7 }, { day: 'Sun', sales: 5 }
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      
      {/* Top Row: Bar & Pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
        {/* Bar Chart (Stock) */}
        <div className="h-full w-full">
           <h4 className="text-xs text-gray-400 mb-2 uppercase font-bold">Stock Levels</h4>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="stock" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart (Categories) */}
        <div className="h-full w-full">
          <h4 className="text-xs text-gray-400 mb-2 uppercase font-bold">Inventory Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: New Sales Line Chart */}
      <div className="h-48 w-full border-t pt-4">
        <h4 className="text-xs text-gray-400 mb-2 uppercase font-bold">Sales Trends (Last 7 Days)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#BE185D" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}