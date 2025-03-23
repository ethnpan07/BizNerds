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

export default function InfoDump() {
const navigate = useNavigate();

return (
  <div 
    className="fixed inset-0 w-full h-full overflow-hidden" 
    style={{ 
      backgroundColor: '#EDE0C8'  // khaki cream color
    }}
  >
    <div className="flex flex-col items-center gap-8 p-8 max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4">Investing 101</h1>
        <p className="text-xl text-gray-700">
          A good place to start. Get the low-down before you dive in.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Investment Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-[#4CAF50] text-white p-6 aspect-[2/3.2] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <CardContent className="flex flex-col h-full overflow-hidden">
              <div className="mb-auto">
                <h2 className="text-3xl font-bold mb-4">Title</h2>
                <p className="text-lg line-clamp-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="mt-auto flex-grow flex items-end justify-center">
                {/* Image container - adjust size as needed */}
                <div className="w-4/5 h-72">
                  {/* You'll need to add the robot hand illustration here */}
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
        >
          <Card className="bg-[#388E3C] text-white p-6 aspect-[2/3.2] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <CardContent className="flex flex-col h-full overflow-hidden">
              <div className="mb-auto">
                <h2 className="text-3xl font-bold mb-4">Title</h2>
                <p className="text-lg line-clamp-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="mt-auto flex-grow flex items-end justify-center">
                <div className="w-4/5 h-72">
                  {/* You'll need to add the isometric store illustration here */}
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
        >
          <Card className="bg-[#1B5E20] text-white p-6 aspect-[2/3.2] rounded-3xl overflow-hidden border-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <CardContent className="flex flex-col h-full overflow-hidden">
              <div className="mb-auto">
                <h2 className="text-3xl font-bold mb-4">Title</h2>
                <p className="text-lg line-clamp-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et lacus tincidunt tincidunt. Sed quis eros vel lorem convallis tincidunt ac a nunc. Maecenas in ligula eget tortor fermentum tempor. Phasellus vehicula, nunc at facilisis tempor, ligula lacus vestibulum odio, sed blandit sapien elit ut ligula. Fusce id orci sed justo posuere tincidunt. Curabitur vehicula sapien et velit tristique, at malesuada elit lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at libero ut lacus varius vulputate in non metus
                </p>
              </div>
              <div className="mt-auto flex-grow flex items-end justify-center">
                <div className="w-4/5 h-52">
                  {/* Handshake illustration here */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Aligned continue button */}
      <motion.div
        className="w-full flex justify-end mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Button
          onClick={() => navigate('/profiler')}
          className="w-[calc(33.333%-1.5rem)] bg-white hover:bg-gray-50 text-[#1B5E20] text-xl font-semibold py-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 group transition-all"
        >
          <span>Continue to Profile Setup</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-7 h-7 group-hover:translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Button>
      </motion.div>
    </div>
  </div>
)
} 