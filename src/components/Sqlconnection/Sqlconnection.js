import {useState} from 'react';
import Sqlconnection from "./Sqlconnection.module.css";
import img1 from "../../assets/Connector.png";
// import img1 from "../../CS-11 Rockstar/connector.png";
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SignupValidationSchema } from "../Validations/Validations";
// import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {
    const [res, setRes] = useState(null);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "",
            host: "",
            password: "",
            database: ""
        },
        validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        // const myUrl = 'http://172.104.174.187:4000/api/signup';
        const myUrl = 'http://localhost:4000/api/sqlconnection';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                    // responseText = response.data
                    setRes(response.data);
                successToast("Connection Established Successfully");
                // navigate("/login"); 
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                ErrorToast("Unexpected Error!");
            })
    };
    return (
        <div className={Sqlconnection["main-container"]}>
            <div className={Sqlconnection["sign-up-container"]}>
                <div className={Sqlconnection["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span>Connecter MySQL</span>
                </div>
                <form className={Sqlconnection["signup-form"]}>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label for="">user</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formik.values.user}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.user && formik.errors.user ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.user}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label for="" >host</label>
                        <input type="text"
                            id="host"
                            name="host"
                            value={formik.values.host}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.host && formik.errors.host ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.host
                            }</span>
                        ) : null}
                    </div>

                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label for="">password</label>
                        <input type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.password}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label for="">database</label>
                        <input type="text"
                            id="database"
                            name="database"
                            value={formik.values.database}
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.database && formik.errors.database ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.database}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection.checkbox}>
                        <input type="checkbox" />  Accept terms and conditions
                </div>
                    <div className={Sqlconnection["signup-btn"]}>
                        <input type="button"
                             name="" value="Establish Connection" onClick={() => signUp()} />
                    </div>
                    <div className={Sqlconnection["back-to-login"]}>
                    </div>
                </form>
            </div>
            <div className={Sqlconnection["connection-msg"]}>
                <span>{res}</span>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp