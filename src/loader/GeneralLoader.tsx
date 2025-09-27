import Image from "next/image";

const GeneralLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-light dark:bg-bg-color-dark transition-opacity duration-500 ease-in-out opacity-100">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-4 relative">
          <Image
            src="/images/logo/logo.svg" // Adjust path if your logo is different
            alt="Loading logo"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
          />
        </div>
        <p className="text-xl font-bold text-body-color dark:text-gray-light">
          Loading Content...
        </p>
      </div>
    </div>
  );
};

export default GeneralLoader;
