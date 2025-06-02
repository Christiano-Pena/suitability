import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { chartColors } from '@/lib/suitability-data';

interface PortfolioChartProps {
  allocation: Record<string, number>;
}

export default function PortfolioChart({ allocation }: PortfolioChartProps) {
  // Filter out zero allocations and prepare data
  const chartData = Object.entries(allocation)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
      displayValue: `${value.toFixed(1)}%`
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.payload.name}</p>
          <p className="text-primary font-bold">{data.payload.displayValue}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    if (value < 5) return null; // Don't show labels for small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${value.toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Chart */}
      <div className="relative h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={chartColors[index % chartColors.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Portfólio</div>
            <div className="text-xs text-muted-foreground">Topo Capital</div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: chartColors[index % chartColors.length] }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground text-sm leading-tight">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.displayValue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
