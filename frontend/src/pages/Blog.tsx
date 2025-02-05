import BlogList from "@/components/blogPage"
import Header from "@/components/Header"

export const Blog = () => {
    return <>
        <div className="min-h-screen bg-white">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <BlogList />
            </div>
        </div>
    </>
    
}