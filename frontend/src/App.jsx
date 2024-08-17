import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/authStore.js";
import {useEffect} from "react";
import HomePage from "./pages/Home.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

// Protect routs that require authentication
const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    if (!user.isVerified) {
        return <Navigate to='/verify-email' replace />;
    }

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user.isVerified) {
        return <Navigate to='/' replace />;
    }
    return children;
};

function App() {
    const {checkAuth, isCheckingAuth} = useAuthStore();
    useEffect(() => {
        checkAuth().then(r => {

        })
    }, [checkAuth]);

    if (isCheckingAuth){
        return <LoadingSpinner/>
    }
    return (
        <main className='min-h-screen'>
            <Header></Header>
            <Routes>
                <Route path='/' element={<ProtectedRoutes>
                    <HomePage/>
                </ProtectedRoutes>}></Route>
                <Route path='/signup' element={<RedirectAuthenticatedUser>
                    <SignUpPage/>
                </RedirectAuthenticatedUser>}></Route>
                <Route path='/login' element={<RedirectAuthenticatedUser>
                    <LoginPage/>
                </RedirectAuthenticatedUser>}></Route>
                <Route path='/verify-email' element={<ProtectedRoutes>
                    <EmailVerificationPage/>
                </ProtectedRoutes>}></Route>
                <Route path='/forgot-password' element={<ProtectedRoutes>
                    <ForgotPasswordPage/>
                </ProtectedRoutes>}></Route>
                <Route path='/rest-password/:token' element={<ProtectedRoutes>
                    <ResetPasswordPage/>
                </ProtectedRoutes>}></Route>
                {/* catch all routes */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
            <Toaster/>
            <Footer></Footer>
        </main>

    )
}

export default App
