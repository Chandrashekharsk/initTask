const Row = ({ customer }) => {
  const {
    email,
    firstName,
    lastName,
    company,
    city,
    country,
    phone1,
    phone2,
    subscriptionDate,
    website,
  } = customer;

  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2">{`${firstName} ${lastName}`}</td>
      <td className="border border-gray-300 px-4 py-2">{email}</td>
      <td className="border border-gray-300 px-4 py-2">{company || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{city || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{country||"N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{phone1||"N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{phone2 || "N/A"}</td>
      <td className="border border-gray-300 px-4 py-2">{new Date(subscriptionDate).toLocaleDateString()}</td>
      <td className="border border-gray-300 px-4 py-2">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visit Website
          </a>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
};

export default Row;
