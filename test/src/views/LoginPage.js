import React, { useState } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import '../styles.css';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    // console.log(list);
    if (list) {
        console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};

export default function LoginPage(props) {
    const { history, ...rest } = props;
    const [userLoginData, setUserLoginData] = useState({
        username: "",
        password: ""
    });

    const [records, setRecords] = useState(getLocalItems());
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserLoginData({ ...userLoginData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...userLoginData }
        console.log(newRecord);
        console.log(records);

        if (newRecord.username == "Admin" && newRecord.password == "admin@tatwa") {
            //console.log('Admin Login found ');
            // return <Redirect to='/AdminPage'  />
            // return <Link to='/AdminPage' ></Link>
            history.push("/AdminPage");
        }
        else {
            let rec = records.filter = (record) => {
                return newRecord.username == record.username && newRecord.password == record.password
            };
            if (rec) {
                history.push("/HomePage");
            }
            else
                alert("Login failed! Try Again");
        }

        setUserLoginData({
            username: "",
            password: ""
        })
    }

    return (
        <>
            <div className="input_wrapper">
                <h2>Sign In Here</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className="input_div">
                        <input type="text" autoComplete="off" value={userLoginData.username} onChange={handleInput} name="username" id="username" placeholder="username" className="input_elm" autoComplete="off"></input>
                    </div>
                    <div className="input_div">
                        <input type="password" autoComplete="off" value={userLoginData.password} onChange={handleInput} name="password" id="password" placeholder="password" className="input_elm"></input>
                    </div>
                    <div className="input_div">
                        <button type="submit" className="input_elm" >Sign In</button>
                    </div>
                </form>
                {/* <div className="already_registered">Already registered? <a target="">Sign in</a></div> */}
            </div>
        </>
    );
}