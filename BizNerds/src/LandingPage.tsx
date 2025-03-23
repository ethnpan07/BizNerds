import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RevolvingText } from "@/components/RevolvingText";
import logo from "@/assets/9CB8960C-6F2E-464E-8A36-3C606EECAC3C.png";

function LandingPage() {
  const navigate = useNavigate();

  // Refs for different sections
  const stockUpRef = useRef(null);
  const usabilityRef = useRef(null);
  const teamPageRef = useRef(null);

  // Detect when sections are in view
  const isStockUpVisible = useInView(stockUpRef, { once: false, amount: 0.3 });
  const isUsabilityVisible = useInView(usabilityRef, { once: false, amount: 0.3 });
  const isTeamPageVisible = useInView(teamPageRef, { once: false, amount: 0.3 });
  

  return (
    <div className="flex flex-col">
      {/* StockUp Section */}
      <div ref={stockUpRef} className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(27,135,45,0.2)_100%)] overflow-y-auto p-4 flex flex-col">
        {/* Header with Logo and Sign In */}
        <div className="flex justify-between items-center w-full h-16 ${isVisible ? 'motion-opacity-in-0 motion-preset-slide-up motion-delay-300' : ''}">
          {/* Logo Placeholder */}
          <Avatar className="w-20 h-20">
            <AvatarImage src={logo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Sign In Button */}
          <Button
            variant="outline"
            className="top-0 right-0 text-xl border-2 border-[rgb(27,135,45)] text-[rgb(27,135,45)] hover:bg-[rgb(27,135,45)] hover:border-[rgb(27,135,45)] hover:text-white opacity-50 hover:opacity-80 mr-8"
            onClick={() => navigate("/SignInPage")}
          >
            Sign In
          </Button>
        </div>
        <div className="flex items-center justify-evenly flex-grow gap-10">
          <div className="flex flex-col items-center justify-evenly gap-10">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={isStockUpVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-[7rem] sm:text-[9rem] md:text-[11rem] font-bold text-center leading-none tracking-wider text-[rgb(27,135,45)] opacity-70 w-full p-6"
            >
              StockUp
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isStockUpVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="text-4xl font-semibold text-[rgb(27,135,45)] opacity-70 flex items-center h-32">
                On
              </div>
              <RevolvingText />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isStockUpVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[400px] h-[2px] bg-[rgb(27,135,45)] opacity-50 ml-[85px] -mt-15"
            />

            <motion.div
              initial={{ opacity: 0, y:50 }}
              animate={isStockUpVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Button
                className="w-2xl mt-4 bg-[rgb(27,135,45,0.6)] text-white transition-all duration-300 hover:scale-105 border-2 border-[rgb(27,135,45,0.5)]"
                onClick={() => navigate("/InfoDump")}
              >
                Begin Your Investment Journey
              </Button>
            </motion.div>
          </div>

          <div ref={usabilityRef} className="flex flex-col items-center justify-between w-full">
            {/* Usability Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }} // Fade in from the right
              animate={isUsabilityVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-[rgb(27,135,45,0.6)] mb-12 border-gray-500 w-14/15">
                <CardHeader>
                  <CardTitle className="text-start text-2xl font-semibold text-white">Usability</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row items-start justify-evenly text-start gap-4">
                  <CardDescription className="text-md text-white flex-1">
                    AI-powered analysis based on real-time stock market data, news, and quarterly reports.
                  </CardDescription>
                  <Separator orientation="vertical" className="h-20 min-h-[5rem] w-[6px] bg-white/50 mx-4 flex-shrink-0"/>
                  <CardDescription className="text-md text-white flex-1">
                    AI-powered stock analysis and recommendations.
                  </CardDescription>
                  <Separator orientation="vertical" className="h-20 min-h-[5rem] w-[2px] bg-white/50 mx-4 flex-shrink-0"/>
                  <CardDescription className="text-md text-white flex-1">
                    Stock recommendations based on your risk tolerance and investment goals.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }} // Fade in from the right
              animate={isUsabilityVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full" // Make the card span full width
            >
              <Card className="bg-[rgb(27,135,45)] opacity-60 w-14/15"> {/* Ensure full width */}
                <CardHeader>
                  <CardTitle className="text-start text-2xl font-semibold text-white">Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-md text-white">
                    Welcome to StockUp! This is Dummy text. This is Dummy text.
                  </CardDescription>
                  <div className="flex justify-end mr-2">
                    <Button variant="link" className="mt-4 text-white hover:text-white/80 transition-all duration-300 hover:scale-105" onClick={() => (window.location.href = "#team-page")}>About Us</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Page Section */}
      <div ref={teamPageRef} id="team-page" className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(27,135,45,0.2)_100%)] overflow-y-auto p-4 flex flex-col">
        <h1 className="text-4xl font-bold text-[rgb(27,135,45)] opacity-80 w-full text-center text-[4rem] sm:text-[6rem] md:text-[8rem] p-6">
          Meet the Team
        </h1>
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-8">
          {[...Array(6)].map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              animate={isTeamPageVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Card className="p-2">
                <CardHeader className="pb-2">
                  <Avatar className="w-8 h-8 mb-1">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">Team Member {idx + 1}</CardTitle>
                  <CardDescription className="text-base">Card Description</CardDescription>
                </CardHeader>
                <CardContent className="py-3">
                  <p className="text-base">Card Content</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
