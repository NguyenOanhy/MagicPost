import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./input/mock-data.json";
import ReadOnlyRow from "./input/ReadOnlyRow";

const PendingOrder = () => {
  const [contacts, setContacts] = useState(data);

  const handleConfirmClick = (id) => {
    // Update the confirmed status of the contact with the given id
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, confirmed: true };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  return (
    <div className="app-container flex flex-col gap-10 text-base">
      <form onSubmit={handleConfirmClick}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="rounded-lg shadow-lg">
              <th className="border bg-main-300">Name</th>
              <th className="border bg-main-300">Address</th>
              <th className="border bg-main-300">Phone Number</th>
              <th className="border bg-main-300">Email</th>
              <th className="border bg-main-300">Status</th>  
              <th className="border bg-main-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <ReadOnlyRow
                key={contact.id}
                contact={contact}
                handleConfirmClick={handleConfirmClick}
              />
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PendingOrder;