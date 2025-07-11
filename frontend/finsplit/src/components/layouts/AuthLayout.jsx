import { LuTrendingUpDown } from "react-icons/lu";
import { FaWallet } from "react-icons/fa";
import { FaRupeeSign, FaArrowUp } from "react-icons/fa";

const AuthLayout = ({children}) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white-100 via-white-200 to-white-300">
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col justify-center'>
        <h2 className='text-3xl font-extrabold text-green-700 mb-2 tracking-tight'>Expense Tracker</h2>
        <div className="mb-8 h-1 w-24 bg-green-600 rounded-full shadow-green-300 shadow"></div>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-green-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Decorative shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-green-600 absolute -top-7 -left-5 opacity-80 shadow-lg shadow-green-300/30" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-green-400 absolute top-[30%] -right-10 opacity-80 shadow-md shadow-green-200/20" />
        <div className="w-32 h-32 rounded-[32px] bg-green-500 absolute -bottom-20 -left-8 opacity-70 shadow-lg shadow-green-400/20" />

        {/* Stats Card */}
        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="4,30,000"
            color="bg-green-600"
          />
        </div>

        {/* Glassmorphism Wallet Card */}
        <div className="w-96 h-56 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-green-200 absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col justify-between p-8 text-green-900 z-30">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full shadow-lg">
              <FaWallet className="text-3xl text-white" />
            </div>
            <span className="font-semibold text-xl text-green-800">My Wallet</span>
            <span className="ml-auto flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              <FaArrowUp className="text-green-500" /> 4%
            </span>
          </div>
          <div>
            <span className="text-sm text-green-700">Current Balance</span>
            <div className="flex items-center gap-3 mt-2">
              <FaRupeeSign className="text-2xl text-green-700" />
              <span className="text-4xl font-bold tracking-wide text-green-900">1,25,000</span>
            </div>
          </div>
          <div className="flex justify-between text-sm opacity-80 mt-3">
            <span className="text-green-700">Last Transaction: <span className="font-semibold text-green-800">+₹5,000</span></span>
            <span className="text-green-700">Updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

const StatsInfoCard = ({icon, label, value, color}) =>{
  return (
    <div className="flex gap-6 bg-white p-5 rounded-2xl shadow-lg shadow-green-400/20 border-2 border-green-300 z-10 items-center">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-xl ring-4 ring-green-200/40`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-green-700 font-semibold mb-1">{label}</h6>
        <span className="text-[22px] text-green-800 font-bold">₹{value}</span>
      </div>
    </div>
  );
};