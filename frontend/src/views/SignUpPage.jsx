import { SignUp } from "@clerk/clerk-react"


export const SignUpPage = () => {
    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <SignUp forceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL} fallbackRedirectUrl={import.meta.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL}/>
        </section>
    )
}