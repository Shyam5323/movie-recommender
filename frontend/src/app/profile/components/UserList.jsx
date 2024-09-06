// UserList.js
import React from "react";

const UserList = ({ entries }) => {
  return (
    <div>
      {entries.map((entry, index) => (
        <div key={entry._id} className="border p-2 mb-2">
          <p>
            <strong>#{index + 1}</strong>
          </p>{" "}
          {/* Add numbering here */}
          <p>{entry.title}</p>
          <p>{entry.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
