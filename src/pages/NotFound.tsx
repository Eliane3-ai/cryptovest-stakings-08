
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0E11] text-white">
      <div className="text-center bg-[#1E2329] p-8 rounded-xl shadow-lg border border-[#474D57]">
        <h1 className="text-4xl font-bold mb-4 text-[#F0B90B]">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        
        <div className="flex flex-col gap-4 items-center">
          <Link to="/" className="w-full">
            <Button className="w-full bg-[#F0B90B] text-black hover:bg-[#F0B90B]/80">
              Return to Home
            </Button>
          </Link>
          
          <Link to="/diagnostics" className="w-full">
            <Button variant="outline" className="w-full border-[#F0B90B] text-[#F0B90B]">
              Run Diagnostics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
