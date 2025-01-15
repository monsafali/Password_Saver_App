import PasswordItem from "./PasswordItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PasswordList({ passwords, setPasswords }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredPasswords = passwords.filter((password) =>
    password.website.toLowerCase().includes(search.toLowerCase())
  );

  const showPasswordsInJson = () => {
    navigate("/json", { state: { passwords } });
  };

  const saveJsonToFile = () => {
    const jsonBlob = new Blob([JSON.stringify(passwords, null, 2)], {
      type: "application/json",
    });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = "passwords.json";
    downloadLink.click();
  };

  return (
    <div className="p-4">
      {/* Search Input and Buttons */}
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search your password"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full border border-blue-400 rounded-md p-2"
        />
        <button
          onClick={showPasswordsInJson}
          className="w-48 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Show Passwords
        </button>
      </div>

      {/* Scrollable Password List */}
      <div
        className="space-y-4 overflow-y-auto"
        style={{
          maxHeight: "500px", // 3 items * estimated height of 84px per item
        }}
      >
        {filteredPasswords.map((password, index) => (
          <PasswordItem
            key={index}
            password={password}
            setPasswords={setPasswords}
            passwords={passwords}
            index={index}
          />
        ))}

        {/* If no results are found */}
        {filteredPasswords.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            No matching passwords found.
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordList;
