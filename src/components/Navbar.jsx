import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "./styles";
import { navLinks } from "../constants";
import { logo, menu, close , instagram , linkedin } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 left-0 right-0 z-[99999] transition-colors duration-300 ${scrolled ? "bg-[#9290c32b] backdrop-blur-md" : "bg-transparent"}`}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 99999,
        isolation: 'isolate',
        transform: 'translateZ(0)'
      }}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Aakash &nbsp;
            <span className='sm:block hidden'> | Nit Jalandhar</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <a href="https://www.linkedin.com/in/aakash-verma-669062269" target="_blank" rel="noopener noreferrer"><img src={linkedin} className=" w-6 h-6" alt="LinkedIn" /></a>
          <a href="https://www.instagram.com/a._a._k._a._s._h?igsh=MWVmbnV4YzVvaHE5Ng==" target="_blank" rel="noopener noreferrer"><img src={instagram} className=" w-6 h-6" alt="Instagram" /></a>


        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[200px] z-[99998] rounded-xl shadow-lg border border-purple-500/20`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
                    } hover:text-white transition-colors duration-200`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex gap-4 mt-4 pt-4 border-t border-purple-500/20">
                <a 
                  href="https://www.linkedin.com/in/aakash-verma-669062269" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img src={linkedin} className="w-6 h-6" alt="LinkedIn" />
                </a>
                <a 
                  href="https://www.instagram.com/a._a._k._a._s._h?igsh=MWVmbnV4YzVvaHE5Ng==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img src={instagram} className="w-6 h-6" alt="Instagram" />
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





