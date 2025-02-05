import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const isAuthenticate = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <nav className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-serif font-bold">
                Medium
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/our-story" className="text-sm text-gray-700 hover:text-gray-900">
                Our story
              </Link>
              <Link to="/membership" className="text-sm text-gray-700 hover:text-gray-900">
                Membership
              </Link>

              {isAuthenticate() ? (
                 <Link to="/write" className="text-sm text-gray-700 hover:text-gray-900">
                 Write
               </Link>
              ) : (
                <Link to="/signUp" className="text-sm text-gray-700 hover:text-gray-900">
                  Write
                </Link>
              )}
             

              {isAuthenticate() ? (
                <button className="text-sm text-gray-700 hover:text-gray-900" onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("domainId")
                  window.location.reload();
                }}>
                  Logout
                </button>
              ) : (
                <Link to="/signUp" className="text-sm text-gray-700 hover:text-gray-900">
                  SignUp
                </Link>
              )}
              
              {isAuthenticate() ? (
                <Link
                to={`/blog/${localStorage.getItem("domainId")}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Get started
              </Link>
              ) : (
                <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Get started
              </Link>
              )}

              
            </div>
          </div>
        </div>
      </nav>


      <div className="flex-1 flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <div className="flex-1 flex flex-col justify-center pr-8">
            <h1 className="text-[85px] font-serif leading-none mb-4">Human stories & ideas</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">A place to read, write, and deepen your understanding</p>
            <div>
            {isAuthenticate() ? (
                <Link to={`/blog/${localStorage.getItem("domainId")}`}>
                <Button className="rounded-full px-8 py-6 bg-black text-white hover:bg-slate-800">Start reading</Button>
              </Link>
              ) : (
                <Link to="/signup">
                <Button className="rounded-full px-8 py-6 bg-black text-white hover:bg-slate-800">Start reading</Button>
              </Link>
              )}


              
            </div>
          </div>


          <div className="flex-1 relative hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8Vaw6Q0rYH95gQkJfztonl5d2mtk6b.png"
                alt="Decorative illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>


      <footer className="border-t border-black/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-6 text-sm text-gray-500">
            <Link to="/help" className="hover:text-gray-900">
              Help
            </Link>
            <Link to="/status" className="hover:text-gray-900">
              Status
            </Link>
            <Link to="/about" className="hover:text-gray-900">
              About
            </Link>
            <Link to="/careers" className="hover:text-gray-900">
              Careers
            </Link>
            <Link to="/blog" className="hover:text-gray-900">
              Blog
            </Link>
            <Link to="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gray-900">
              Terms
            </Link>
            <Link to="/text-to-speech" className="hover:text-gray-900">
              Text to speech
            </Link>
            <Link to="/teams" className="hover:text-gray-900">
              Teams
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

