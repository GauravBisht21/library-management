import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate();
    const [loginMessage, setLoginMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                
                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                //Show login successfull message for one second and then naviate to book list component
                setLoginMessage('Login successful!');
                setTimeout(() => {
                    //reaload the page and navigate to book list
                    navigate('/book-list');
                    window.location.reload();
                }, 1000);
            } catch (error) {
                setLoginMessage('Login failed. Please check your credentials.');
            }
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 border shadow rounded p-3">
                    <h1 className="text-center mb-4">Login</h1>
                    {loginMessage && (
                        <div className={`alert ${loginMessage.includes('failed') ? 'alert-danger' : 'alert-success'}`} role="alert">
                            {loginMessage}
                        </div>
                    )}
                    <form onSubmit={formik.handleSubmit} className="p-4">
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email Address</label>
                            <span className='text-danger'> *</span>
                            <input
                                id="email"
                                type="email"
                                className={`mt-2 form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <span className='text-danger'> *</span>
                            <input
                                id="password"
                                type="password"
                                className={`mt-2 form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
