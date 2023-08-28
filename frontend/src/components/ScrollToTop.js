import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();
    const delay = 700;
    const [scrollTimeout, setScrollTimeout] = useState(null);
  
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
          // Clear the previous timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
  
        // Create a new timeout to scroll after the specified delay
        const newTimeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, delay);
  
        // Set the new timeout in state
        setScrollTimeout(newTimeout);
    }, [pathname, delay, scrollTimeout]); 
  }
  
  export default ScrollToTop;