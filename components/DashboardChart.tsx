"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

export default function DashboardChart({ products }: { products: any[] }) {
  // Bar Data: Combine Stock & Value
  const barData = products.slice(0, 6).map(p => ({ 
    name: p.name, 
    stock: p.stock,
    value: p.stock * p.price 
  }));
  
  // Pie Data: Value by Category
  const categoryData: any = {};
  products.forEach(p => {
    const cat = p.category || "Other";
    const val = p.price * p.stock;
    categoryData[cat] = (categoryData[cat] || 0) + val;
  });
  const pieData = Object.keys(categoryData).map(key => ({ name: key, value: categoryData[key] }));
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Sales Trend (Simulated)
  const salesData = products.map(p => ({ name: p.name, units: p.sales || 0 }));

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* Row 1: Stock vs Value & Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
        
        {/* Dual Bar Chart */}
        <div className="h-full w-full">
           <h4 className="text-xs text-gray-400 mb-4 uppercase font-bold tracking-wider">Inventory Metrics (Stock vs Value)</h4>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#10B981" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar yAxisId="left" dataKey="stock" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} name="Stock Qty" />
              <Bar yAxisId="right" dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} name="Total Value ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Full Filled Pie Chart */}
        <div className="h-full w-full">
          <h4 className="text-xs text-gray-400 mb-4 uppercase font-bold tracking-wider">Value by Category</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Sales Line Chart */}
      <div className="h-48 w-full border-t pt-6 border-gray-100">
        <h4 className="text-xs text-gray-400 mb-4 uppercase font-bold tracking-wider">Sales Performance (Units Sold)</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
             <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
             <Tooltip cursor={{ fill: '#f9fafb' }} />
             <Bar dataKey="units" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={30} name="Units Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}