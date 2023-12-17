import React, { useState } from "react";

const ReadOnlyRow = ({ contact, handleConfirmClick }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    handleConfirmClick(contact.id);
  };

  return (
    <tr className="border-separate shadow-lg">
      <td className="py-2">{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>{confirmed ? "Done" : "Pending"}</td>
      <td>
        {confirmed ? (
          // <span className="bg-green-100">Deliveried</span>
          <button
            type="button"
            className=" bg-green-100 text-white px-4 rounded-full w-28 items-center"
          >
            Deliveried
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className=" bg-main-400 text-white px-4 rounded-full w-28 items-center"
          >
            Confirm
          </button>
        )}
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
