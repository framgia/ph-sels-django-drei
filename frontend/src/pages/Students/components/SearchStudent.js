import React, { useCallback } from "react";

const SearchStudent = ({ searchText, setSearchText }) => {
  const handleOnChange = useCallback(
    (e) => {
      setSearchText(() => setSearchText(e.target.value));
    },
    [setSearchText]
  );

  return (
    <div
      className="ui icon large input"
      style={{ marginLeft: "30%", marginRight: "30%" }}
    >
      <input
        type="text"
        placeholder="Search students..."
        value={searchText}
        onChange={handleOnChange}
      />
      <i className="search icon"></i>
    </div>
  );
};

export default SearchStudent;
