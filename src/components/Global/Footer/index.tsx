"use client"
import Image from 'next/image';
import Link from 'next/link';
Image
import { usePathname } from 'next/navigation';
import React from 'react';


const Footer: React.FC = () => {
  const path = usePathname();

  if (path === '/learnix') {
    return null;
  }
  return (
    <div className='flex bg-gradient-to-r from-[#5513ee5c] via-[#000000] to-[#5513ee5c] w-full'>
      {/* <div className=' relative flex align-bottom justify-start'>
        <Image src={"/models/test.png"} alt="image" height={100} width={100} />
      </div> */}
      <div
        className="relative z-10 w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 py-10 px-10 "
      >
        <div className="flex flex-col  items-center justify-center w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 py-10 px-10">
          <ul className="flex md:flex-row flex-col items-center justify-center gap-10 text-white font-bold">
            <li>
              <Link href={"/community"}>Community</Link>
            </li>
            <li>
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/learnix"}>LearniX</Link>
            </li>
          </ul>
          <hr className="w-full border-t border-gray-200 my-4" />
          <ul className="flex md:flex-row flex-col items-center justify-center gap-10 text-white] text-sm">
            <li>© 2024 Learnium. All rights reserved.</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
      </div>
      {/* <div>
        <Image src={"/models/test.png"} alt ="image" height={100} width={100}/>
      </div> */}
    </div>
  );
};

export default Footer;