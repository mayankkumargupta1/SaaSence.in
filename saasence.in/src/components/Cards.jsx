import {
  MdOutlineFlashOn,
  MdOutlineImage,
  MdOutlineInsertDriveFile,
  MdOutlineVideocam,
  MdFolder,
} from "react-icons/md";
import { LuWebhook } from "react-icons/lu";
import { FaCube } from "react-icons/fa";
import { SiOpenai, SiHuggingface } from "react-icons/si";
import { RiDatabase2Line } from "react-icons/ri";

const Card = ({ icon, title, description, children }) => (
  <div className="flex-1 bg-[#0F0F0F] rounded-2xl p-6 shadow-xl flex flex-col min-w-[280px] max-w-[calc(25%-1.5rem)] border border-gray-800">
    <div className="flex items-center mb-4">
      <span className="mr-3 text-[#8B05FF] text-2xl">{icon}</span>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
      {description}
    </p>
    <div className="flex-grow flex flex-col justify-end">{children}</div>
  </div>
);

const StorageCardContent = () => (
  <div className="grid grid-cols-3 gap-3">
    {[...Array(5)].map((_, i) => (
      <div
        key={`img-${i}`}
        className="bg-[#1A1A1A] rounded-lg p-3 flex items-center justify-center text-gray-400 text-xl hover:bg-[#2A2A2A] transition-colors"
      >
        <MdOutlineImage />
      </div>
    ))}
    {[...Array(4)].map((_, i) => (
      <div
        key={`doc-${i}`}
        className="bg-[#1A1A1A] rounded-lg p-3 flex items-center justify-center text-gray-400 text-xl hover:bg-[#2A2A2A] transition-colors"
      >
        <MdOutlineInsertDriveFile />
      </div>
    ))}
    {[...Array(3)].map((_, i) => (
      <div
        key={`vid-${i}`}
        className="bg-[#1A1A1A] rounded-lg p-3 flex items-center justify-center text-gray-400 text-xl hover:bg-[#2A2A2A] transition-colors"
      >
        <MdOutlineVideocam />
      </div>
    ))}
  </div>
);

const RealtimeCardContent = () => (
  <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-[#1A1A1A]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2A2A] rounded-full w-20 h-10 flex items-center justify-center text-gray-400 text-2xl z-10">
      ...
    </div>
    <svg
      className="absolute top-1/4 left-1/4 w-8 h-8"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M12.4468 18.0673L12.4468 23.3642L15.3524 16.582L23.7547 16.582L0 0L12.4468 18.0673Z"
        fill="#D1D5DB"
      />
    </svg>
    <svg
      className="absolute bottom-1/4 right-1/4 w-8 h-8 rotate-180"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        d="M12.4468 18.0673L12.4468 23.3642L15.3524 16.582L23.7547 16.582L0 0L12.4468 18.0673Z"
        fill="#D1D5DB"
      />
    </svg>
  </div>
);

const VectorCardContent = () => (
  <div className="relative w-full h-48 flex items-center justify-center">
    <svg
      className="w-full h-full max-w-[150px] max-h-[150px] my-6"
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        d="M50 0L100 25L50 50L0 25L50 0Z"
        stroke="#4B5563"
        strokeWidth="1.5"
      />
      <path d="M0 25L50 50V100L0 75V25Z" stroke="#4B5563" strokeWidth="1.5" />
      <path
        d="M100 25L50 50V100L100 75V25Z"
        stroke="#4B5563"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="30" r="2" fill="#34D399" />
      <circle cx="70" cy="15" r="2" fill="#3B82F6" />
      <circle cx="85" cy="50" r="2" fill="#6B7280" />
      <circle cx="35" cy="80" r="2" fill="#34D399" />
      <circle cx="60" cy="70" r="2" fill="#3B82F6" />
      <circle cx="15" cy="60" r="2" fill="#6B7280" />
      <circle cx="50" cy="25" r="2" fill="#34D399" />
      <circle cx="50" cy="75" r="2" fill="#3B82F6" />
    </svg>
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start space-y-2 px-2">
      <div className="flex items-center text-gray-300">
        <SiOpenai className="mr-2 text-xl" /> OpenAI
      </div>
      <div className="flex items-center text-gray-300">
        <SiHuggingface className="mr-2 text-xl" /> Hugging Face
      </div>
    </div>
  </div>
);

const DataAPIsCardContent = () => {
  const ApiItem = ({ name, path }) => (
    <div className="flex items-center relative z-10">
      <div className="w-8 h-8 flex items-center justify-center text-gray-500 text-lg">
        <RiDatabase2Line />
      </div>
      <div className="absolute left-[30px] w-6 h-[1px] border-t border-dashed border-gray-600"></div>
      <div className="flex justify-between flex-grow bg-[#121212] pr-2 ml-2">
        <span className="bg-[#2A2A2A] text-gray-300 rounded-full px-4 py-1 text-sm font-medium">
          {name}
        </span>
        <span className="bg-[#2A2A2A] text-gray-300 rounded-full px-4 py-1 text-sm font-medium">
          .../v1/{path}
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col space-y-4 pt-2 pb-2">
      <div className="absolute left-[36px] top-0 h-[calc(100%-1.5rem)] w-[1px] border-l border-dashed border-gray-600"></div>
      {[
        { name: "countries", path: "countries" },
        { name: "continents", path: "continents" },
        { name: "cities", path: "cities" },
        { name: "states", path: "states" },
        { name: "country_codes", path: "country_codes" },
        { name: "oceans", path: "oceans" },
      ].map((item, idx) => (
        <ApiItem key={idx} {...item} />
      ))}
    </div>
  );
};

export default function Cards() {
  return (
    <div className="pb-80 bg-black text-white p-8 font-sans">
      <div className="flex flex-wrap justify-center items-stretch gap-6 max-w-7xl mx-auto">
        <Card
          icon={<MdFolder />}
          title="Storage"
          description="Secure and scalable storage for all your media files."
        >
          <StorageCardContent />
        </Card>

        <Card
          icon={<MdOutlineFlashOn />}
          title="Realtime"
          description="Build collaborative, real-time Agents with ease."
        >
          <RealtimeCardContent />
        </Card>

        <Card
          icon={<FaCube />}
          title="Best Model"
          description="Use your fav model."
        >
          <VectorCardContent />
        </Card>
      </div>

      <p className="text-gray-400 text-lg text-center mt-12">
        Use the modules you need.{" "}
        <span className="font-bold text-white">SaaSence is plug-and-play.</span>
      </p>
    </div>
  );
}
