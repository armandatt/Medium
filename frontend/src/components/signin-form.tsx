import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import axios from "axios";
import { BACKEND_URL } from "@/config"
import { SigninInput } from "../../../common/src/index"

export default function SignInForm() {
    const [postInputs, setPostInputs] = useState<SigninInput>({
            email: "",
            password: ""
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

    async function sendSignInRequest(){
        try {
            const responce = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = responce.data.jwt;
            const domainId = responce.data.domainId;

            localStorage.setItem("token" , jwt)
            localStorage.setItem("domainId", domainId.toString())
            navigate(`/blog/${domainId}`)
        } catch (error) {

            console.log("Invalid Credentials")
            
        }
    }

    return (
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <div className="flex flex-col text-center space-y-2">
                    <h1 className="text-3xl font-bold">LogIn to an account</h1>
                    <div className="flex items-center justify-center space-x-1">
                        <p className="text-gray-500 dark:text-gray-400">Create a new account?</p>
                        <Link to="/signup" className="text-gray-500 dark:text-gray-400 underline">
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-4 rounded">
                <div className="space-y-2 rounded">
                    <Label htmlFor="email">Email</Label>
                    <Input className="rounded" id="email" placeholder="john@example.com" required type="email"
                    onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })} />
                </div>
                <div className="space-y-2 rounded">
                    <Label htmlFor="password">Password</Label>
                    <Input className="rounded " id="password" required type="password" 
                    onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}/>
                </div>
                <Button className="w-full bg-black text-white hover:bg-slate-800 rounded " type="submit" disabled={isLoading} onClick={sendSignInRequest}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>
        </div >
    )
}
