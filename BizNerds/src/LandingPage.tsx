import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-white overflow-y-auto p-12">
      {/* Logo Placeholder */}
      <div className="w-40 h-40 border-4 border-black rounded-full"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        {/* Large Text for "BizNerdz" */}
        <h1 className="text-[16rem] font-bold text-center leading-none">
          BizNerdz
        </h1>

        {/* Body Paragraph */}
        <p className="mt-12 text-5xl text-gray-600 text-center max-w-6xl">
          Welcome to BizNerdz! The ultimate platform for business and tech enthusiasts.
        </p>
      </div>

      {/* Start Button */}
      <Button
        className="fixed bottom-16 right-16 px-12 py-6 bg-black text-white rounded-2xl text-4xl"
        onClick={() => navigate("/InfoDump")}
      >
        Start
      </Button>
    </div>
  );
}

export default LandingPage;
