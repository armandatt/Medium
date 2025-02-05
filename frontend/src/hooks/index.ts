import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export interface Blog {
  id: string
  title: string
  content: string
  author: {
    name: string
  }
  createdAt?: string
  authorBio?: string
  domainId: number
}

export const useBlogs = ({ domainId }: { domainId: string }) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("Fetching blogs for domainId:", domainId)
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        console.log("Using token:", token)
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${domainId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        console.log("Response data:", response.data)
        if (response.data && response.data.blog) {
          setBlogs(response.data.blog)
        } else {
          console.error("Unexpected response structure:", response.data)
          setError("Unexpected response structure")
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs.")
      } finally {
        setIsLoading(false)
      }
    }

    if (domainId) {
      fetchBlogs()
    } else {
      console.log("No domainId provided")
      setIsLoading(false)
    }
  }, [domainId])

  return { blogs, isLoading, error }
}


export interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
  }
  createdAt?: string
  authorBio?: string
  domainId: number
}

export const useBlogPost = ({id}: {id : string}) => {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/fullBlog/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })

        // Add static values to the response data
        const postWithStaticData = {
          ...response.data.blog,
          createdAt: "2024-02-04T12:00:00Z", // Static date
          authorBio: "Master of mirth, purveyor of puns, and the funniest person in the kingdom.", // Static bio
        }

        setPost(postWithStaticData)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setError("Failed to load blog post")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchBlogPost()
    }
  }, [id])

  return { post, isLoading, error }
}

