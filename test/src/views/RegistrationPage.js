import React, { useState, useEffect } from 'react'
import  { Link } from 'react-router-dom'
import '../styles.css';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};


export default function RegistrationPage(props) {
    const { history, ...rest } = props;
    const [userRegData, setUserRegData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    });

    const [records, setRecords] = useState(getLocalItems());
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserRegData({ ...userRegData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = {...userRegData, id : new Date().getTime().toString()}
        setRecords([...records, newRecord])
        console.log(records);

        setUserRegData({ id: "",
        username: "",
        fullname: "",
        email: "",
        password: ""})
    }

    const GoToLoginPage = () => {
    //  return <Link to="/LoginPage" />;
        history.push("/LoginPage");
      };
    
// add data to localStorage
useEffect(() => {
 localStorage.setItem('lists', JSON.stringify(records));
}, [records]);

    return (
        <>
            <div className="input_wrapper">
                <h2>Sign Up Here</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className="input_div">
                        <input type="text" autoComplete="off" value={userRegData.username} onChange={handleInput} name="username" id="username" placeholder="username" className="input_elm" autoComplete="off"></input>
                    </div>
                    <div className="input_div">
                        <input type="text" autoComplete="off" value={userRegData.fullname} onChange={handleInput} name="fullname" id="fullname" placeholder="fullname" className="input_elm"></input>
                    </div>
                    <div className="input_div">
                        <input type="email" autoComplete="off" value={userRegData.email} onChange={handleInput} name="email" id="email" placeholder="email" className="input_elm"></input>
                    </div>
                    <div className="input_div">
                        <input type="password" autoComplete="off" value={userRegData.password} onChange={handleInput} name="password" id="password" placeholder="password" className="input_elm"></input>
                    </div>
                    <div className="input_div">
                        <button type="submit" className="input_elm" >Sign Up</button>
                    </div>
                </form>
                <div className="already_registered">Already registered? <a target="" onClick={GoToLoginPage}>Sign in</a></div>
            </div>
        </>
    );
}