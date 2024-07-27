import React from 'react';

const ToggleList = ({ isListVisible, toggleListVisibility }) => {

  return (
    <div>
      <button 
        className={`btn m-2 ${isListVisible ? 'btn-danger' : 'btn-success'}`} 
        onClick={toggleListVisibility}
      >
        {isListVisible ? '▲ Hide List' : '▼ Show List'}
      </button>
    </div>
  );
};

export default ToggleList;
