import { motion } from "framer-motion";
import {useAuthStore} from "../store/authStore.js";
import { formatDate } from "../utils/date";

const HomePage = () => {
    const {user, logout} = useAuthStore()
    const handleLogout = ()=>{
        logout()
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Profile</h2>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div
                        className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-5">
                            <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Full Name : {user.name}
                            </p>
                            <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Email : {user.email}
                            </p>

                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Account
                        Activity</h2>
                </div>
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <p className='text-gray-900'>
                        <span className='font-bold'>Joined: </span>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p className='text-gray-900'>
                        <span className='font-bold'>Last Login: </span>
                        {formatDate(user.lastLogin)}
                    </p>
                </div>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.6}}
                    className='mt-4'
                >
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={handleLogout}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                    >
                        Logout
                    </motion.button>
                </motion.div>
            </div>

        </section>

    )
}

export default HomePage;