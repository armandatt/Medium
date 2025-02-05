import SignupForm from "../components/signup-form"
import Quote from "../components/quote"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <SignupForm />
      </div>
      <div className="flex-1 bg-primary">
        <Quote />
      </div>
    </div>
  )
}