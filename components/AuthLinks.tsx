"use client";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

// Define the types for the component props if needed
const AuthLinks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className='text-xl hover:text-gray-500 cursor-pointer'>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className='text-xl cursor-pointer hover:text-gray-500'>
            Write
          </Link>
          <span className='text-xl cursor-pointer hover:text-gray-500' onClick={handleSignOut}>
            Logout
          </span>
        </>
      )}
      <div className='w-5 h-4 hidden flex-col justify-between cursor-pointer' onClick={() => setOpen(!open)}>
        <div className='w-full h-1 text-gray-500'></div>
        <div className='w-full h-1 text-gray-500'></div>
        <div className='w-full h-1 text-gray-500'></div>
      </div>
      {open && (
        <div className='absolute top-24 left-0 bg-slate-300 h-screen w-full flex flex-col items-center justify-center gap-12 text-4xl z-999'>
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className='cursor-pointer' onClick={handleSignOut}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
