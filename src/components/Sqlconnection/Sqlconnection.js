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
import { emitData, listenerData, listenerWatch } from '../../socket';
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

const ErrorToast = (msg) => {
    toast.error(msg);
}

const successToast = (msg) => {
    toast.success(msg);
}
const SignUp = () => {
    const [res, setRes] = useState(null);
    const [lines, setLines] = useState([]);
    const [watch, setWatch] = useState([]);
    // const [watchLines, setWLines] = useState([]);
    useEffect(() => {
        listenerData(setLines)
        listenerWatch(setWatch)
    }, [])
    
    // listenerData("Hello")

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "",
            host: "",
            password: "",
            database: ""
        },
        // validationSchema: SignupValidationSchema
    })

    const signUp = () => {
        const myUrl = 'http://172.104.174.187:4120/api/sqlconnection';
        // const myUrl = 'http://localhost:4120/api/sqlconnection';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                    // responseText = response.data
                    // setLines(response.data);
                    setRes(response.data)
                    console.log(response.data)
                    emitData("hello")
                successToast("Connection Established Successfully");
                // navigate("/login"); 
                // console.log(response);
            })
            .catch((error) => {
                console.log(error);
                ErrorToast("Unexpected Error!");
            })
        // emitData("hello");
        // emitWatch();
    };
    return (
        <div className={Sqlconnection["main-container"]}>
            <div className={Sqlconnection["sign-up-container"]}>
                <div className={Sqlconnection["sign-up-title"]}>
                    <img src={img1} alt="" />
                    <span>Connector</span>
                </div>
                <form className={Sqlconnection["signup-form"]}>
                    <div className={Sqlconnection["resizing-input-fields"]}>
                        <label for="">User</label>
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
                        <label for="" >Host</label>
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
                        <label for="">Password</label>
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
                        <label for="">Database</label>
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
                    <div className={Sqlconnection["signup-btn"]}>
                        <input type="button"
                             name="" value="Establish Connection" onClick={() => signUp()} />
                    </div>
                    <div className={Sqlconnection["back-to-login"]}>
                    </div>
                </form>
            </div>
            <ToastContainer />
            <div id="output" className={Sqlconnection["output-all"]}>
{
    res &&
    // <div className={Sqlconnection["connection-msg"]}>
    <div id="my-table" className={Sqlconnection["users-table"]}>

                    <table className='table'>
                        <thead className='table-dark'>
                        <tr>
                        <th scope='col'> Event Time </th>
                        <th scope='col'> Server ID </th>
                        <th scope='col'> Command Type </th> 
                        <th scope='col'> Query </th>
                        </tr>
                        </thead>
                        {
                    lines.map((item, index) => (
                        <tbody>
                        <tr key={index}>
                            <th scope='row'> {item.et}</th>
                            <td> {item.server_id} </td>
                            <td> {item.command_type} </td>
                            <td> {item.qu}</td>
                        </tr>
                        </tbody>
                        ))
                        } 
                    </table>
                    {/* // "HELLO WORLD" */}
                
            </div>
}
{
            res &&
            // <div className={Sqlconnection["main-container"]}>
            <div className={Sqlconnection["output-card"]}> 
            <h2>Logs Recieved:</h2>
                    {watch.map((item, index) => (
                        <div key={index}>
                            {item.resLine}
                        </div>
                       ))}
                        {/* <div>{watchLines[watchLines.length - 1]}</div> */}
                    
            </div>
            // </div>
}
</div>
        </div>
    )
                        }
export default SignUp