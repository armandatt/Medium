import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, MoreHorizontal, Plus } from "lucide-react"
import PublishPage from "./PublishPage";
import axios from "axios";
import { BACKEND_URL } from "@/config"
import { useCallback } from "react"

export default function WritePage() {
  const [isSaved, setIsSaved] = useState(true)
  const [showPublish, setShowPublish] = useState(false)
  const Navigate = useNavigate()

  interface BlogPost {
    title : string,
    content : string,
    domainId: number
  }

  const [blogs , setBlogs] = useState<BlogPost>({
    title : "",
    content : "",
    domainId : 0
  }) 


  async function sendBlogCreateRequest() : Promise<void> {
    try {
      const responce = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, blogs, {
        headers: {
          Authorization: localStorage.getItem("token")
      }
      })
      const id = responce.data.id;
      if (id) {
        setIsSaved(true)
        console.log("Blog Created Succesfully!!!")
        setShowPublish(false)
        Navigate(`/blog/${localStorage.getItem("domainId")}`)
      }
    }catch (error) {
      console.log(error)
    }
  }

  const handleDomainSelect = useCallback((domainId: number) => {
    setBlogs((prev) => ({ ...prev, domainId }))
    console.log(domainId)
  }, [])


  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-[1336px] mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-xl">M</span>
                </div>
              </Link>
              <div className="text-sm text-gray-500">
                Draft in <span className="text-gray-900">Kirags</span>
                {isSaved && <span className="ml-3">Saved</span>}
              </div>
            </div>


            <div className="flex items-center gap-4">
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full"
                onClick={() => setShowPublish(true)}
              >
                Publish
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
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


      <main className="max-w-[744px] mx-auto px-4 py-8">
        <div className="flex gap-4">
          <div className="flex-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-gray-200 hover:border-gray-400"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Add image</DropdownMenuItem>
                <DropdownMenuItem>Add video</DropdownMenuItem>
                <DropdownMenuItem>Add embed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          <div className="flex-1 space-y-4">
            <textarea
              value={blogs.title}
              onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
              placeholder="Title"
              className="w-full resize-none overflow-hidden text-4xl font-serif leading-tight placeholder:text-gray-300 focus:outline-none"
              rows={2}
              style={{ height: "auto" }}
            />
            <textarea
              value={blogs.content}
              onChange={(e) => setBlogs({ ...blogs, content: e.target.value })}
              placeholder="Tell your story..."
              className="w-full resize-none text-xl leading-relaxed placeholder:text-gray-400 focus:outline-none"
              rows={20}
            />
          </div>
        </div>
      </main>
      {showPublish && (
        <PublishPage
          onClose={() => setShowPublish(false)}
          onPublish={sendBlogCreateRequest}
          onDomainSelect={handleDomainSelect}
          title={blogs.title}
          content={blogs.content}
        />
      )}
    </div>
  )
}

