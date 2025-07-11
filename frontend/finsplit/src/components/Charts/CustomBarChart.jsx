import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const CustomBarChart = ({ data }) => {

    // function to alternate bar colors
    const getBarColor = (index) => { 
        return index % 2 === 0 ? '#a1a1aa' : '#f4f4f5'; // zinc-400 and zinc-100
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">      
                    <p className="text-xs font-semibold text-gray-700 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">&#8377;{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none"/>

                    <XAxis dataKey={data.length && data[0].month ? "month" : "category"} tick={{ fontSize:12, fill:'#555'}} stroke="none" />
                    <YAxis tick={{ fontsize:12,fill:'#555'}} stroke="none" />
                    <Tooltip content={CustomTooltip}/>
                    
                    <Bar 
                        dataKey="amount" 
                        fill="#a1a1aa"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
