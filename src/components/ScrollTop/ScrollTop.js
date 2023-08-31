import { useState, useEffect } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

const ScrollTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <>
      {showTopBtn && (
        <div className="up">
          <a href="#">
            <BsFillArrowUpSquareFill className="icon" />
          </a>
        </div>
      )}
    </>
  );
};
export default ScrollTop;
