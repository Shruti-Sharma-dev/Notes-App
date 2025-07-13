// LandingScreen.jsx
import { Link } from 'react-router-dom';
import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function LandingScreen() {

  const textRef = useRef(null);

  useEffect(() => {
    // const tl = gsap.timeline({ onComplete: () => {
    //   // hold a bit before transition
    //   setTimeout(() => onFinish(), 2000);
    // }});

    // Animate "Welcome" from top
const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );

    
    return () => tl.kill();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-teal-500 px-4">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg w-full max-w-md sm:p-8 h-[80vh] max-h-[700px]">

        
      <h1 ref={textRef}className="text-2xl font-extrabold text-yellow-500 flex-column justify-center items-center mb-20">
          <span className='flex item-center text-center'>THINK IT. NOTE IT,</span> 
          <span  className='flex item-center text-center'>NEVER FORGET IT</span>
    
          
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2">
          Get Started With <span className="text-indigo-500">NotEase</span>
        </h2>

        <div className="flex flex-col gap-4 mt-12 w-full">
          <Link to="/login">
            <button className="rounded-lg bg-teal-500 px-6 py-2 text-white w-full text-base font-medium hover:bg-teal-600 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="rounded-lg bg-teal-500 px-6 py-2 text-white w-full text-base font-medium hover:bg-teal-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
