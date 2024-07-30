import { useEffect } from 'react';

function useOutsideClick(
  ref: React.MutableRefObject<HTMLElement>,
  setIsInside: React.Dispatch<React.SetStateAction<boolean>>,
  subRef?: React.MutableRefObject<HTMLElement>
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref?.current && !ref?.current.contains(event.target) && !subRef?.current.contains(event.target)) {
        setIsInside(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;
