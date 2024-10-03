export const RightSection = () => {
  return (
      <div className="hidden md:block md:w-96 border-[#7437FF] border-2 mx-4 md:h-96 rounded-xl p-4">
          <h2 className="text-lg font-bold">Top Questions</h2>
          <ul className="mt-4 space-y-5">
              <li className="text-sm text-gray-400 cursor-pointer">How to center a div?</li>
              <li className="text-sm text-gray-400 cursor-pointer">NextJS - Typescript build failed</li>
              <li className="text-sm text-gray-400 cursor-pointer">How to open a link in a new Tab?</li>
          </ul>
      </div>
  );
};
