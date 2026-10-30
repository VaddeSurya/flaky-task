
import React from "react";

const UserForm = ({ onSave }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    onSave({
      id: Date.now().toString(36) +
          Math.random().toString(36).substring(2, 5),
      name: name.trim(),
      email: email.trim(),
      isSaved: false,
    });

    setName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-2 h-fit w-fit p-4"
    >
      <input
        type="text"
        placeholder="Enter the name"
        className="border-2 p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter the email"
        className="border-2 p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-700 text-white p-2"
      >
        Save
      </button>
    </form>
  );
};

export default UserForm;
