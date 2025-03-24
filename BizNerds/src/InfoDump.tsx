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
import stocksImage from './assets/stocks-image.png';  // Update path as needed
import bondsImage from './assets/bonds-image.png';    // Update path as needed
import etfImage from './assets/etfs-image.png';       // Update path as needed

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
        {/* Stocks Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full"
        >
          <Card className="h-full bg-[#98D8AA] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <h2 className="text-[4.5vh] font-bold mb-[3vh] text-center w-full">Stocks</h2>
              <div className="w-full h-[25vh] flex items-center justify-center mb-[2vh]">
                <img 
                  src={stocksImage} 
                  alt="Stocks" 
                  className="h-full w-[80%] object-contain p-4 bg-white/50 rounded-2xl border-3 border-[#2C3E50]/20 shadow-lg"
                />
              </div>
              <p className="text-[2.2vh] flex-1 text-center">
              Buying shares of a company means you own a piece of that business. Stocks can offer high growth but can also be volatile.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bonds Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-full"
        >
          <Card className="h-full bg-[#F5E6E8] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <h2 className="text-[4.5vh] font-bold mb-[3vh] text-center w-full">Bonds</h2>
              <div className="w-full h-[25vh] flex items-center justify-center mb-[2vh]">
                <img 
                  src={bondsImage} 
                  alt="Bonds" 
                  className="h-full w-[80%] object-contain p-4 bg-white/50 rounded-2xl border-3 border-[#2C3E50]/20 shadow-lg"
                />
              </div>
              <p className="text-[2.2vh] flex-1 text-center">
              Bonds are loans you give to governments or companies. They generally offer lower risk and stable income through interest payments.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ETFs Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="h-full"
        >
          <Card className="h-full bg-[#98D8AA] text-[#2C3E50] p-[2vh] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <CardContent className="flex flex-col h-full">
              <h2 className="text-[4.5vh] font-bold mb-[3vh] text-center w-full">Mutual Funds/ETFs</h2>
              <div className="w-full h-[25vh] flex items-center justify-center mb-[2vh]">
                <img 
                  src={etfImage} 
                  alt="ETFs" 
                  className="h-full w-[80%] object-contain p-4 bg-white/50 rounded-2xl border-3 border-[#2C3E50]/20 shadow-lg"
                />
              </div>
              <p className="text-[2.2vh] flex-1 text-center">
              These funds pool money from many investors to buy a diversified portfolio of stocks or bonds. They are excellent for beginners because they provide built-in diversification.              </p>
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