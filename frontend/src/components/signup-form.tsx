import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import type { SignupInput } from "../../../common/src/index"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupForm() {
  const [postInputs, setPostInputs] = useState<SignupInput & { domainId: number }>({
    name: "",
    email: "",
    password: "",
    domainId: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  async function sendSignUpRequest() {
    try {
      const responce = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
      const jwt = responce.data.jwt
      localStorage.setItem("token", jwt)
      localStorage.setItem("domainId", postInputs.domainId.toString())
      navigate(`/blog/${postInputs.domainId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex flex-col text-center space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-gray-500 dark:text-gray-400">Already have an account?</p>
            <Link to="/signin" className="text-gray-500 dark:text-gray-400 underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 rounded">
        <div className="space-y-2 rounded">
          <Label htmlFor="name">Name</Label>
          <Input
            className="rounded"
            id="name"
            placeholder="John Doe"
            required
            onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
          />
        </div>
        <div className="space-y-2 rounded">
          <Label htmlFor="email">Email</Label>
          <Input
            className="rounded"
            id="email"
            placeholder="john@example.com"
            required
            type="email"
            onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
          />
        </div>
        <div className="space-y-2 rounded">
          <Label htmlFor="password">Password</Label>
          <Input
            className="rounded "
            id="password"
            required
            type="password"
            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
          />
        </div>
        <div className="space-y-2 rounded">
          <Label htmlFor="domain">Domain of Interest</Label>
          <Select onValueChange={(value) => setPostInputs({ ...postInputs, domainId: Number.parseInt(value) })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">React</SelectItem>
              <SelectItem value="2">DevOps</SelectItem>
              <SelectItem value="3">Machine Learning</SelectItem>
              <SelectItem value="4">Psychology</SelectItem>
              <SelectItem value="5">Trading</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full bg-black text-white hover:bg-slate-800 rounded "
          type="submit"
          disabled={isLoading}
          onClick={sendSignUpRequest}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>
    </div>
  )
}



