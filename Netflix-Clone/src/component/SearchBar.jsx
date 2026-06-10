function SearchBar({search , setSearch }) {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSearch('')}>reset</button>
    </>
  );
}

export default SearchBar;