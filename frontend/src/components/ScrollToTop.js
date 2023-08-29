import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const delay = 700;
    const [scrollTimeout, setScrollTimeout] = useState(null);

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

        // Clear the timeout when the component unmounts
        return () => {
            if (newTimeout) {
                clearTimeout(newTimeout);
            }
        };
    // eslint-disable-next-line
    }, [pathname, delay]); // Removed scrollTimeout from the dependency array

    return null; // ScrollToTop is not rendering anything itself
};

export default ScrollToTop;
