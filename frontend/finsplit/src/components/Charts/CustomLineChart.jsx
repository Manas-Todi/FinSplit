import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CustomLineChart = ({data}) => {

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">      
                    <p className="text-xs font-semibold text-green-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">&#8377;{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="none" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
              <Tooltip content={<CustomTooltip />} />

              <Area type="monotone" dataKey="amount" stroke="#22c55e" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: "#4ade80" }} />
          </AreaChart>
      </ResponsiveContainer>
    </div>
  )
};

export default CustomLineChart