import { useEffect } from 'react';

function useOutsideClick(
  ref: React.MutableRefObject<HTMLElement>,
  setIsInside: React.Dispatch<React.SetStateAction<boolean>>,
  subRef?: React.MutableRefObject<HTMLElement>
) {
  useEffect(() => {
    /**
     * setIsInside если кликнуть вне элемента или sub-элемента
     */
    function handleClickOutside(event) {
      if (ref?.current && !ref?.current.contains(event.target) && !subRef?.current.contains(event.target)) {
        setIsInside(false);
      }
    }
    // Создаем слушатель
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Удаляем слушатель
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideClick;
