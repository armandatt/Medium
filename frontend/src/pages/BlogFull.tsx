import BlogPost from "@/components/fullBlog"
import Header from "@/components/Header"

export const BlogFull = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <BlogPost />
            </div>
        </div>
    )
}