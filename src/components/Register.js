import './Register.css'
import React, { Component } from 'react'
function Register() {
    return (
        <>
            <div className='done'>
                <form>
                <div className="border border-3 border-primary"></div>
                    <h3 className="fw-bold mb-2 text-uppercase ">Please Sign Up</h3>
                    <div className="mb-3">
                        <label>First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                 
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already registered{" "}
                        <a href="/login" className="text-primary fw-bold">
                          sign in?
                        </a>
                      </p>
                    </div>
                    
                </form>
            </div>

        </>
    );
}

export default Register;
