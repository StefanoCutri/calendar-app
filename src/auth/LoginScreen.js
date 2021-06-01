import React from 'react';
import { useDispatch } from 'react-redux';
import { StartLogin } from '../actions/auth';
import { useForm } from '../hooks/useForm';
import './login.css'

export const LoginScreen = () => {

    const dispatch = useDispatch();


    const initialLoginForm = {
        lEmail: 'stefano@gmail.com',
        lPassword: '123456'
    };
    
    const [ loginValues, handleInputLoginChange, reset ] = useForm( initialLoginForm );

    const { lEmail, lPassword } = loginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(StartLogin(lEmail, lPassword))
    }




    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log in</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleInputLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleInputLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sing up</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat your password" 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}