function ClearAllButton({ setPasswords }) {
  const handleClear = () => {
    setPasswords([]);
  };

  return (
    <button onClick={handleClear} className="btn btn-danger w-full mt-4">
      Clear All Passwords
    </button>
  );
}

export default ClearAllButton;
