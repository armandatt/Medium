import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useBlogPost } from "@/hooks/index"

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const { post  , isLoading, error } = useBlogPost({id : id || ""})

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!post) return <div>Blog post not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
          <p className="text-muted-foreground">
            Posted on{" "}
            {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="prose prose-gray max-w-none dark:prose-invert">{post.content}</div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-4">
            <h2 className="text-xl font-semibold">Author</h2>
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={post.author?.name} />
                {/* <AvatarFallback>{post.author?.name[0]?.charAt(0)}</AvatarFallback> */}
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">{post.author?.name || "Anonyms"}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.authorBio || "A passionate writer sharing insights and experiences."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



