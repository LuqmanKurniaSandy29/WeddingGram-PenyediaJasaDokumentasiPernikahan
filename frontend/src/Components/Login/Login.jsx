import React from "react";
import "../Login/Login.css";

const Login = () => {
    return (
        <div className="login template d-flex justify-content-center align-item-center vh-100 bg-color">
            <div className="p-5 rounded m-auto bg-light" style={{ height: 'max-content' }}>
                <form>
                    <h3 className="text-center my-3">Login</h3>
                    <div className="mb-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Masukkan Username" className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Masukkan Password" className="form-control" />
                    </div>
                    <div className="d-grid text-center my-3"> 
                        <a href="/Login">
                            <button className="custom-button py-2 px-3 fw-semibold">
                                Login
                            </button>
                        </a>
                    </div>
                    <p className="text-center my-3">
                        Belum memiliki akun? <a href="/register">Registrasi</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
