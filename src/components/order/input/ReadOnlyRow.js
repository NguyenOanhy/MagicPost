import React, { useState } from "react";

const ReadOnlyRow = ({ contact, handleConfirmClick }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    handleConfirmClick(contact.id);
  };

  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>{confirmed ? "Done" : "Pending"}</td>
      <td>
        {confirmed ? (
          <span className="text-green-500">Confirmed</span>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
