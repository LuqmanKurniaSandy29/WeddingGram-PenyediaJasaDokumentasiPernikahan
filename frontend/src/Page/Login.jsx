import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

const Login = () => {
    return (
        <div className="login template d-flex justify-content-center align-item-center vh-100 bg-color">
            <div className="p-5 rounded m-auto bg-light" style={{ height:'max-content'}}>
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
                        <Button style={{ backgroundColor: "#D5A351", border: "none", padding:"7px 60px" }} href="/login">Login</Button>
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
