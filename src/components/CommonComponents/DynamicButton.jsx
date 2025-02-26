import { useState } from "react";
// Button component that toggles dark/light mode by receiving state and setter as props

function DynamicButton () {
  const [isDarkMode, setIsDarkMode] = useState('light');
  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)} className={isDarkMode ? 'dark' : 'light'}>
      {isDarkMode ? 'light' : 'dark'}
    </button>
  );
}

export default DynamicButton;
