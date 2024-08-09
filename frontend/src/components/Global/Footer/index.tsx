import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="h-full bg-[#0B0121]" style={{
      backgroundImage: 'url(/images/test.jpg)', // Replace 'background.jpg' with your image file name
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} >
      <div
        className="h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 py-10 px-10"

      >
        <div className="flex flex-col items-center justify-center h-full  w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 py-10 px-10 ">
          <ul className='flex item-center justify-center gap-10 text-[#0c1131] font-bold'>
            <li>
              <Link href={'/'}>Community</Link>
            </li>
            <li>
              <Link href={'/'}>Projects</Link>
            </li>
            <li>
              <Link href={'/'}>Events</Link>
            </li>
            <li>
              <Link href={'/'}>Courses</Link>
            </li>

          </ul>
          <hr className="w-full border-t border-gray-200 my-4" />
          <ul className='flex item-center justify-center gap-10 text-[#0c1131] text-sm'>
            <li>© 2024 Learnium. All rights reserved.</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookies Settings</li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
