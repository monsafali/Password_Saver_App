import { FaRegCopy } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function PasswordItem({ password, setPasswords, passwords, index }) {
  const [copiedField, setCopiedField] = useState(""); // Track which field is copied
  const [showDialog, setShowDialog] = useState(false); // Manage dialog visibility

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmed) {
      setPasswords((prevPasswords) =>
        prevPasswords.filter((_, i) => i !== index)
      );
    }
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000); // Reset the copied state after 2 seconds
    });
  };

  const showPasswordDetails = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 border rounded">
        {/* Website Name */}
        <div>
          <p
            className="font-semibold text-blue-500 cursor-pointer hover:underline"
            onClick={showPasswordDetails}
          >
            {password.website}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {/* Copy Username */}
          <div className="flex items-center  space-x-1">
            <span className="text-sm">Username:</span>
            <button
              onClick={() => handleCopy(password.username, "Username")}
              className={`btn btn-sm ${
                copiedField === "Username" ? "text-green-500" : ""
              }`}
            >
              <FaRegCopy />
            </button>
          </div>

          {/* Copy Password */}
          <div className="flex items-center space-x-1">
            <span className="text-sm">Password:</span>
            <button
              onClick={() => handleCopy(password.password, "Password")}
              className={`btn btn-sm ${
                copiedField === "Password" ? "text-green-500" : ""
              }`}
            >
              <FaRegCopy />
            </button>
          </div>

          {/* Delete Button */}
          <button onClick={handleDelete} className="btn btn-sm text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Details for {password.website}
            </h2>
            <p>
              <strong>Username:</strong> {password.username}
            </p>
            <p>
              <strong>Password:</strong> {password.password}
            </p>
            <p>
              <strong>Total Passwords Saved:</strong> {passwords.length}
            </p>
            <button
              onClick={closeDialog}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordItem;
