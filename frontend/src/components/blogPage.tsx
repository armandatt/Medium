import { useParams, Link } from "react-router-dom"
import { useBlogs } from "@/hooks/"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Bookmark, MoreHorizontal } from "lucide-react"

export default function BlogList() {
  const { domainId } = useParams<{ domainId: string }>()
  const { blogs, isLoading, error } = useBlogs({ domainId: domainId || "" })

  if (isLoading) return <div>Loading blogs...</div>
  if (error) return <div>Error: {error}</div>
  if (!blogs || blogs.length === 0) return <div>No blogs found for this domain.</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Tabs defaultValue="for-you" className="w-full max-w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="for-you" className="text-base">
              For you
            </TabsTrigger>
            <TabsTrigger value="following" className="text-base">
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-8">
        {blogs.map((blog) => (
          <Link to={`/blog/post/${blog.id}`} key={blog.id}>
            <article className="flex gap-6 py-2 hover:bg-accent/50 rounded-lg transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8 bg-black text-white">
                    <AvatarImage src={""} alt={""} />
                    <AvatarFallback>{blog.author?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{blog.author?.name || "Anonymous"}</span>
                </div>

                <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">{blog.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Domain ID: {blog.domainId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

