export const Filter = ({ newFilter, setNewFilter }) => {
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <form>
      <div>
        filter shown with: <input value={newFilter} onChange={handleNewFilter} />
      </div>
    </form>
  );
};
