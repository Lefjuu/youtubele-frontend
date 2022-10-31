import Logo from "./Logo"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { useAppContext } from "../context/appContext"
import Alert from "./Alert"


const initialState = {
    username: '',
    email: '',
    password: '',
    isMember: true,
}


const LoginCard = () => {

    const { user, setupUser, isLoading, showAlert, displayAlert, toggleLoginPage } = useAppContext()

    const navigate = useNavigate()
    const [values, setValues] = useState(initialState)


    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { username, email, password, isMember } = values
        if (!email || !password || (!isMember && !username)) {
            displayAlert()
            return
        }
        const currentUser = { username, email, password }
        console.log(currentUser);
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting...',
            })
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User Created! Redirecting...',
            })
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
                toggleLoginPage()
            }, 2000)
        }
        // eslint-disable-next-line
    }, [user, navigate])

    return (
        <div className="login">
            <div className="login__container">

                <div className="login__logo">
                    <Logo />
                </div>

                <h3 className="login__title">
                    {values.isMember ? 'Login' : 'Register'}
                </h3>

                <form className="login__form" onSubmit={onSubmit}>
                    {showAlert && <Alert />}
                    {!values.isMember && (
                        <>
                            <span>Username</span>
                            <label className="login__label"></label>
                            <input
                                type="text"
                                className="login__input"
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                            />
                        </>
                    )}
                    <span>Email</span>
                    <label className="login__label"></label>
                    <input
                        type="email"
                        className="login__input"
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    <span>Password</span>
                    <label
                        htmlFor='password'
                        className="login__label"
                    ></label>
                    <input
                        type="password"
                        name='password'
                        className="login__input"
                        value={values.password}
                        onChange={handleChange}
                    />


                    <button type='submit' className="login__btn" disabled={isLoading}> submit</button>
                    <div className="login__register">
                        <p>
                            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                            <button type='button' onClick={toggleMember} className='login__btn-member'>
                                {values.isMember ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginCard