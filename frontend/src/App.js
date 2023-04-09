import { Container} from 'react-bootstrap';
import './App.css';
import './index.css';
import './bootstrap.min.css';
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { UserInfoPage } from './pages/UserInfoPage';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { PrivateRoute } from './auth/PrivateRoute';
import  HomePage  from './pages/HomePage';
import LoginFail from './pages/LoginFail';


function App() {



    return (
        <Router>
        <Header />
        <main className="py-3">
        <Container>
              <Routes>
               <Route path="/" element={<HomePage/>} exact/>
               <Route path="/loginFail" element={<LoginFail/>}/>
                <Route path='/login' element={<LogInPage/>}/>
                <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/please-verify' element={<PleaseVerifyEmailPage/>}/>
                 <Route path='/verify-email/:verification_token' element={<EmailVerificationLandingPage/>}/>
                <Route path='/reset-password/:password_forgot_token' element={<PasswordResetLandingPage/>}/>                
            </Routes>
        </Container>
      </main>
         <Footer/>
    </Router>
    );
}
export default App;
