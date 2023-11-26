import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import styles from './DropdownMenu.module.css'

const DropdownMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    // Handle the click of each option here
    console.log(`Clicked on ${option}`);
    // Close the dropdown after handling the option click
    setShowDropdown(false);
  };

  return (
    <div className={styles.dropdown_container}>
      <button className={styles.dropdown_btn} onClick={toggleDropdown}>
        <FaEllipsisV />
      </button>
      {showDropdown && (
        <div className={styles.dropdown_content}>
          <p onClick={() => handleOptionClick('Option 1')}>Option 1</p>
          <p onClick={() => handleOptionClick('Option 2')}>Option 2</p>
          <p onClick={() => handleOptionClick('Option 3')}>Option 3</p>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
