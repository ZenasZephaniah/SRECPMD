"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardChart({ products }: { products: any[] }) {
  // Prepare data
  const barData = products.slice(0, 5).map(p => ({ name: p.name, stock: p.stock }));
  
  // Group by category for Pie Chart
  const categoryData: any = {};
  products.forEach(p => {
    const cat = p.category || "Other";
    categoryData[cat] = (categoryData[cat] || 0) + 1;
  });
  const pieData = Object.keys(categoryData).map(key => ({ name: key, value: categoryData[key] }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
      {/* Bar Chart */}
      <div className="h-full w-full">
         <h4 className="text-xs text-gray-400 mb-2 uppercase font-bold">Stock Levels</h4>
         <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="stock" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="h-full w-full flex flex-col items-center">
        <h4 className="text-xs text-gray-400 mb-2 uppercase font-bold">Inventory Split</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}