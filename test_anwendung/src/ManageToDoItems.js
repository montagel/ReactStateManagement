import React from 'react';
import './ManageToDo.css'

function ManageToDoItems({ setImportanceFilter, importanceFilter, setSortOrder  }) {
  const handleImportanceChange = (e) => {
    const newValue = parseInt(e.target.value);
        setImportanceFilter(newValue);
    console.log("Selected importanceFilter:", newValue);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    console.log("Selected sortOrder:", e.target.value);
  };

  return (
    <div className="filter-by-importance">
      <label>Filtern nach Wichtigkeit: {importanceFilter}</label>
      <input 
        type="range" 
        min="0" 
        max="10" 
        value={importanceFilter}
        onChange={handleImportanceChange} 
      />
       <div className="sort-by-duration">
        <label>Sortieren nach Dauer:  </label>
        <select onChange={handleSortOrderChange}>
          <option value="ascending">Aufsteigend</option>
          <option value="descending">Absteigend</option>
        </select>
      </div>
    </div>
  );
}

export default ManageToDoItems;
