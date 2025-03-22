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
    <div className="relative min-h-screen w-full bg-[#B4D7B4] overflow-y-auto p-12">
      {/* Logo Placeholder */}
      <Avatar className = "w-60 h-60">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>


      {/* Main Content */}
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-12rem)] -mt-12">
        {/* Large Text for "BizNerdz" */}
        <h1 className="text-[35rem] font-bold text-center leading-none tracking-wider text-white opacity-50 w-full">
          BizNerdz
        </h1>

        {/* Body Paragraph and Button Container */}
        <div className="relative w-full max-w-[90%] mt-0">
          <p className="text-5xl text-gray-800 text-center opacity-60">
            Welcome to BizNerdz! The ultimate platform for business and tech enthusiasts.
          </p>

          {/* Start Button */}
          <div className="flex justify-center mt-24 mb-24">
            <Button
              className="px-16 py-8 bg-[#4A7B4A] hover:bg-[#3E673E] text-white rounded-3xl text-5xl opacity-50 hover:opacity-80"
              onClick={() => navigate("/InfoDump")}
            >
              Start
            </Button>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-3 gap-12 mb-24">
            {/* Card 1 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>

            {/* Card 4 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>

            {/* Card 5 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>

            {/* Card 6 */}
            <Card className="p-6">
              <CardHeader className="pb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Card Title</CardTitle>
                <CardDescription className="text-xl">Card Description</CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <p className="text-2xl">Card Content</p>
              </CardContent>
              <CardFooter className="pt-6">
                <p className="text-xl">Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
