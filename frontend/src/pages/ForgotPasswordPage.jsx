import {useState} from "react";
import {useAuthStore} from "../store/authStore.js";
import Input from "../components/Input.jsx";
import {ArrowLeft, Mail} from "lucide-react";
import {Link} from "react-router-dom";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {forgotPassword} = useAuthStore()

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        await forgotPassword(email)
        setIsSubmitted(true);
    }
    return (
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a href="" className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     className='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg' alt=""/>
                Bakheet
            </a>
            <div
                className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                        Forgot Password
                    </h1>
                    {!isSubmitted ? (
                        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                            <Input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Send Rest Link
                            </button>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <Mail className='h-8 w-8 text-center text-green-900'/>
                            <p className='text-gray-300 mb-6'>
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                    <div className="px-8 flex justify-center">
                        <Link to={'/login'}
                              className="text-sm text-primary-600 hover:underline flex items-center">
                            <ArrowLeft className='h-4 w-4 mr-2'/> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage