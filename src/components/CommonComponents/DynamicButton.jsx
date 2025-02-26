
// Button component that toggles dark/light mode by receiving state and setter as props

function DynamicButton ({ isDarkMode, setIsDarkMode }) {
  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default DynamicButton;
