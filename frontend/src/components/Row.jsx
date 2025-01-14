const Row = ({ email, firstName, lastName, company, city, country, phone1, phone2, subscriptionDate, website }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{firstName} {lastName}</h3>
      <p className="text-gray-600"><span className="font-medium">Email:</span> {email}</p>
      <p className="text-gray-600"><span className="font-medium">Company:</span> {company || "N/A"}</p>
      <p className="text-gray-600"><span className="font-medium">City:</span> {city || "N/A"}</p>
      <p className="text-gray-600"><span className="font-medium">Country:</span> {country}</p>
      <p className="text-gray-600"><span className="font-medium">Phone 1:</span> {phone1}</p>
      {phone2 && <p className="text-gray-600"><span className="font-medium">Phone 2:</span> {phone2}</p>}
      <p className="text-gray-600"><span className="font-medium">Subscription Date:</span> {new Date(subscriptionDate).toLocaleDateString()}</p>
      {website && (
        <p className="text-blue-600 underline">
          <a href={website} target="_blank" rel="noopener noreferrer">Visit Website</a>
        </p>
      )}
    </div>
  );
};

export default Row;
