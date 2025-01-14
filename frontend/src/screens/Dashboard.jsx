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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <Row
              key={customer._id}
              email={customer.email}
              firstName={customer.firstName}
              lastName={customer.lastName}
              company={customer.company}
              city={customer.city}
              country={customer.country}
              phone1={customer.phone1}
              phone2={customer.phone2}
              subscriptionDate={customer.subscriptionDate}
              website={customer.website}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-lg text-gray-700">No customers found</h2>
      )}
    </div>
  );
};

export default Dashboard;
