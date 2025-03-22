import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,1)_0%,_rgba(27,135,45,0.2)_100%)] overflow-y-auto p-4 flex flex-col">
      {/* Header with Logo and Sign In */}
      <div className="flex justify-between items-center w-full">
        {/* Logo Placeholder */}
        <Avatar className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Sign In Button */}
        <Button
          variant="outline"
          className="px-6 py-3 text-xl border-2 border-[rgb(27,135,45)] text-[rgb(27,135,45)] hover:bg-[rgb(27,135,45)] hover:border-[rgb(27,135,45)] hover:text-white opacity-50 hover:opacity-80 mr-8"
          onClick={() => navigate("/")}
        >
          Sign In
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start flex-grow">
        {/* Large Text for "StockUp" */}
        <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold text-center leading-none tracking-wider text-[rgb(27,135,45)] opacity-50 w-full">
          StockUp
        </h1>

        {/* Body Paragraph and Button Container */}
        <div className="relative w-full max-w-[95%] lg:max-w-[90%] mt-8 sm:mt-12 md:mt-16">
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 text-center opacity-60">
            Welcome to StockUp! This is Dummy text. This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.This is Dummy text.
          </p>

          {/* Start Button */}
          <div className="flex justify-center mt-6 mb-6 sm:mt-8 sm:mb-8">
            <Button
              variant="outline"
              className="px-4 py-2 sm:px-5 sm:py-3 border-2 border-[rgb(27,135,45)] text-[rgb(27,135,45)] hover:bg-[rgb(27,135,45)] hover:border-[rgb(27,135,45)] hover:text-white rounded-xl text-xl sm:text-2xl opacity-50 hover:opacity-80"
              onClick={() => navigate("/InfoDump")}
            >
              Begin Your Investment Journey
            </Button>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Card 1 (apply to all cards) */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Kelsie Chung</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Leo Jiang</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Darshil Sheth</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Nicholas Hoang</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>

            {/* Card 5 */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Ethan Pan</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>

            {/* Card 6 */}
            <Card className="p-2">
              <CardHeader className="pb-2">
                <Avatar className="w-8 h-8 mb-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">Kathryn Guh</CardTitle>
                <CardDescription className="text-base">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-3">
                <p className="text-base">Card Content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
