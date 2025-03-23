import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card"
import { motion } from "framer-motion";
import { theme } from "./theme";

export default function InfoDump() {
const navigate = useNavigate();

return (
  <div 
    className={`h-screen w-screen overflow-hidden ${theme.typography.fontFamily}`}
    style={{ 
      background: theme.colors.background.gradient
    }}
  >
    <div className="h-full w-full px-[5vw] py-[3vh] flex flex-col">
      {/* Header - takes up 15vh */}
      <motion.div 
        className="h-[15vh] flex flex-col justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[4vh] font-bold text-center text-[#2C3E50]">Investing 101</h1>
        <p className="text-[2vh] text-[#2C3E50] opacity-80 text-center">
          A good place to start. Get the low-down before you dive in.
        </p>
      </motion.div>

      {/* Cards Container - takes up 70vh */}
      <div className="h-[70vh] grid grid-cols-3 gap-[2vw] my-[2vh]">
        {/* Investment Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full"
        >
          <Card className="h-full bg-[#98D8AA] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-[2.5vh] font-bold mb-[2vh]">Title</h2>
                <p className="text-[1.8vh] line-clamp-[12]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="h-[30%] flex items-end justify-center">
                <div className="w-4/5 h-full">
                  {/* Image placeholder */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stock Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-full"
        >
          <Card className="h-full bg-[#F5E6E8] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-[2.5vh] font-bold mb-[2vh]">Title</h2>
                <p className="text-[1.8vh] line-clamp-[12]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="h-[30%] flex items-end justify-center">
                <div className="w-4/5 h-full">
                  {/* Image placeholder */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stock Market Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="h-full"
        >
          <Card className="h-full bg-[#98D8AA] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-[2.5vh] font-bold mb-[2vh]">Title</h2>
                <p className="text-[1.8vh] line-clamp-[10]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="h-[30%] flex items-end justify-center">
                <div className="w-4/5 h-full">
                  {/* Handshake illustration here */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Button Container - takes up remaining 10vh */}
      <motion.div
        className="h-[10vh] flex items-center justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Button
          onClick={() => navigate('/profiler')}
          className="w-1/3 h-[7vh] bg-[#98D8AA] hover:bg-[#7BC77B] text-[#2C3E50] text-[2vh] font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-3 group transition-all"
        >
          <span>Continue to Profile Setup</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-[2.5vh] h-[2.5vh] group-hover:translate-x-8 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Button>
      </motion.div>
    </div>
  </div>
)
} 