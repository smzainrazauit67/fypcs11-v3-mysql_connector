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
import { emitWatch, emitData, listenerData, listenerWatch } from '../../socket';
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
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);

    // const [watchLines, setWLines] = useState([]);
    useEffect(() => {
        listenerData(setLines)
        listenerWatch(setWatch)
    }, [])
    
    // listenerData("Hello")

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user: "root",
            host: "",
            password: "",
            database: "mysql"
        },
        // validationSchema: SignupValidationSchema
    })

    const archLog = () => {
        setFlag1(true);
        setFlag2(false);
        const myUrl = 'http://172.104.174.187:4120/api/sqlconnection';
        // const myUrl = 'http://localhost:4120/api/sqlconnection';
        axios.post(myUrl, formik?.values)
            .then((response) => {
                    // responseText = response.data
                    // setLines(response.data);
                    setRes(response.data)
                    console.log(response.data)
                    // emitData("hello")
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

    const livLog = () => {
        setFlag1(false);
        setFlag2(true);
        emitWatch('hello')
    }

    
    return (
        <div className={Sqlconnection["main-container"]}>
        <div className={Sqlconnection["header-button"]}>
<Button variant="primary">Back to Dashboard</Button>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={Sqlconnection["bi bi-info-circle-fill"]} viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
</svg>
</div>
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
                            value="root"
                            disabled
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
                            value="mysql"
                            disabled
                            onChange={formik?.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.database && formik.errors.database ? (
                            <span className={Sqlconnection["error-message"]} >{formik.errors.database}</span>
                        ) : null}
                    </div>
                    <div className={Sqlconnection["signup-btn"]}>
                    <div className={Sqlconnection["archive-btn"]}>
                        <input type="button"
                             name="" value="Archive Logs" onClick={() => archLog()} />
                    </div>
                    <div className={Sqlconnection["live-btn"]}>
                        <input type="button"
                             name="" value="Live Tail" onClick={() => livLog()} />
                    </div>
                    <div className={Sqlconnection["back-to-login"]}>
                    </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
            <div id="output" className={Sqlconnection["output-all"]}>
{
    flag1 && res &&
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
                    res.map((item, index) => (
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
            flag2 &&
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