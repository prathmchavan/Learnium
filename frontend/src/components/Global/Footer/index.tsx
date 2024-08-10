import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const Footer: React.FC = () => {
  return (
    <BackgroundGradientAnimation containerClassName='h-full w-full'>
      <div
        className="relative z-10 w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 py-10 px-10"
      >
           <div className="flex justify-start  items-center">
                    <Image src={'/logo/log.svg'} width={150} height={150} alt="logo"/>
            </div>
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 py-10 px-10">
          <ul className="flex items-center justify-center gap-10 text-white font-bold">
            <li>
              <Link href={"/"}>Community</Link>
            </li>
            <li>
              <Link href={"/"}>Projects</Link>
            </li>
            <li>
              <Link href={"/"}>Events</Link>
            </li>
            <li>
              <Link href={"/"}>Courses</Link>
            </li>
          </ul>
          <hr className="w-full border-t border-gray-200 my-4" />
          <ul className="flex items-center justify-center gap-10 text-white] text-sm">
            <li>© 2024 Learnium. All rights reserved.</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Footer;