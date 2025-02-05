import SignInForm from "../components/signin-form"
import Quote from "../components/quote"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <SignInForm />
      </div>
      <div className="flex-1 bg-primary">
        <Quote />
      </div>
    </div>
  )
}