
import React, { useState } from "react";

import UserForm from "./Components/UserForm";
import UserList from "./Components/UserList";
import { saveUser } from "./Services/userService";

const App = () => {
  const [users, setUsers] = useState([]);

  const handleSave = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    postUser(newUser);
  };

  const postUser = async (user) => {
    try {
      await saveUser(user);

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item.id === user.id
            ? { ...item, isSaved: true }
            : item
        )
      );
    } catch (error) {
      // console.error("Posting failed:", error.message);

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item.id === user.id
            ? { ...item, isSaved: false }
            : item
        )
      );
    }
  };

  const handleRetry = (user) => {
    postUser(user);
  };

  return (
    <div className="flex gap-10 p-10">
      <UserForm onSave={handleSave} />

      <UserList
        users={users}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default App;
