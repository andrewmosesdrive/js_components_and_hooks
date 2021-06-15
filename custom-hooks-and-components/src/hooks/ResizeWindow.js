import { useState, useEffect } from 'react';

// custom hook to track window width
export default function ResizeWindow() {
  // assign window.innerWidth to state values
  const [width, setWidth] = useState(window.innerWidth);
  
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
  };

  useEffect(() => {
    // add a listener so that after every re-render we can set a new width size
    window.addEventListener('resize', handleWindowResize);
    // don't forget to clean up the event listener to avoid memory leaks
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // return the new window width state value for ease of use
  return width;
};