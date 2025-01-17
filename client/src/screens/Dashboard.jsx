import api from "../config/axios";
import { useEffect, useState } from "react";
import Row from "../components/Row";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { apiKey } = useSelector((state) => state.auth); 
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useSelector((state)=> state.auth) ;
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null); 
    try {
      const res = await api.get(`/users/all?api_key=${apiKey}`);
      if (res.status === 200) {
        console.log(res.data);
        setCustomers(res.data.users);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customer data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if(!user) navigate("/login");

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl flex items-center justify-center font-bold mb-6 text-gray-800">Dashboard</h2>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 rounded p-4 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : customers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Company</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Phone 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Phone 2</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Subscription Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Website</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <Row key={customer._id} customer={customer} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-center text-lg text-gray-700">No customers found</h2>
      )}
    </div>
  );
};

export default Dashboard;
