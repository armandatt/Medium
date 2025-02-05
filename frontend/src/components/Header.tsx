import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, PenSquare, Bell, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="border-b border-black/10">
      <header className="h-16">
        <div className="max-w-[1336px] h-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-serif font-bold">
                Medium
              </Link>
              <div className="hidden sm:flex items-center relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-10 w-64 bg-gray-50 border-none focus-visible:ring-0"
                />
              </div>
            </div>


            <div className="flex items-center gap-4">
              <Link to="/write" className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <PenSquare className="h-5 w-5" />
                <span>Write</span>
              </Link>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-600 rounded-full" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      {showBanner && (
        <div className="relative bg-white border-b border-black/10">
          <div className="max-w-[1336px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-center gap-1 text-sm">
              <span className="text-yellow-600 text-base">✦</span>
              <p>Get unlimited access to the best of Medium for less than $1/week.</p>
              <Link to="/membership" className="font-semibold underline ml-1">
                Become a member
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

        </div>
      )}
      {/* <div className="min-h-screen bg-white">
        <Slider></Slider>
      </div> */}
    </div>

  )
}