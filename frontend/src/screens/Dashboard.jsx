import axios from "axios";
import { useEffect, useState } from "react";
import Row from "../components/Row";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/customers");
      if (res.status === 200) {
        console.log(res.data);
        setCustomers(res.data);
      }
    } catch (error) {
      console.log("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      {loading ? (
        <h2 className="text-center text-lg text-gray-700">Loading...</h2>
      ) : customers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Company</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Phone 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Phone 2</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Subscription Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">Website</th>
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
