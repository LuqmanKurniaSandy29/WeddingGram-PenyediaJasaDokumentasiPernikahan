import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

const Login = () => {
    return (
        <div className="login template d-flex justify-content-center align-item-center 100-w 100-vh bg-color">
            <div className="40-w p-5 rounded mx-5 my-5 bg-light">
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
                        Belum memiliki akun? <a href="/Registrasi">Registrasi</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
