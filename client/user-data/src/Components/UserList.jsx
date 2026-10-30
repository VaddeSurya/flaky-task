
import React from "react";

const UserList = ({ users, onRetry }) => {
  return (
    <div className="flex flex-wrap gap-3 border-2 p-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="border-2 p-3 mb-2"
        >
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>

          {user.isSaved ? (
            <div className="text-green-600">
              Saved
            </div>
          ) : (
            <div className="text-red-600">
              Not saved

              <button
                className="border-2 ml-2 px-2 cursor-pointer"
                onClick={() => onRetry(user)}
              >
                Retry!
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
