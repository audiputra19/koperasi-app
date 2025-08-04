
import { LoaderCircle } from "lucide-react";
import { type FC, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Loading: FC = () => {
  const spinValue = useRef<number>(0);
  const location = useLocation();

  useEffect(() => {
    const spin = () => {
      spinValue.current = 0;
      const interval = setInterval(() => {
        spinValue.current += 0.01;
        if (spinValue.current >= 1) spinValue.current = 0;
      }, 20);
      return () => clearInterval(interval);
    };
    spin();
  }, []);

  return (
        <div className="fixed inset-0 flex justify-center items-center z-[20]">
                <div className="absolute inset-0 bg-black/30 z-[15]" />
                <div className="relative z-20 bg-white rounded-lg shadow-md px-12 py-10 flex flex-col items-center gap-2">
                    <div className="animate-spin text-blue-500">
                        <LoaderCircle size={42} />
                    </div>
                    <div className="text-sm text-gray-700 flex items-center">
                        <p className="animate-pulse">Memuat</p>
                    </div>
                </div>
        </div>
    );
};

export default Loading;