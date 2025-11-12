import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // agar user page ke bottom ke kareeb hai
      if (scrollTop + windowHeight >= fullHeight - 10) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div>
        <div  className={`fixed bottom-0 left-0 w-full bg-slate-800 text-white text-center py-2 text-sm transition-all duration-300 ${
          showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>© 2025 EMS — All rights reserved.</div>
    </div>
  )
}

export default Footer