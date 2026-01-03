import { SignIn } from "@clerk/clerk-react"


export const SignInPage = () => {
    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <SignIn forceRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL} fallbackRedirectUrl={import.meta.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL}/>
        </section>
    )
}