import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import {signUpserver} from './connectServer/userController'
 import { validEmail, validPassword, validUserName } from './validation'

export default withRouter(function  SignUp(props){



    
    const nameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [checkUserName, setCheckUserName] = useState({ status: false, message: '' })
    const [checkPassword, setCheckPassword] = useState({ status: false, message: '' })
    const [checkEmail, setCheckEmail] = useState({ status: false, message: '' })


    async function req() {
    //   if (checkUserName.status && checkPassword.status && checkEmail.status) {
    //         if (userNameRef.current.value != '' && emailRef.current.value != '' && passwordRef.current.value != '') {
    //         authMethodes.signUp(emailRef.current.value,passwordRef.current.value)}}
            debugger;
            const res = await signUpserver(nameRef.current.value, passwordRef.current.value, emailRef.current.value)
            console.log('1 from then compon ', res);
            if (res != undefined && res.status == 200) {
                console.log('2 from then compon ', res);
                return props.history.push('/Login')
            }
     //   }
    }
    return(
      

       <div className="container mt-5">
        <div className="row">
            <div className="col-6 m-auto mt-3 ">
                <div className="card card-body bg-secondary border border-3 border-warning rounded">
                    <h3 className="text-center text-warning">Sign up</h3>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-light fw-bold form-label text-center">User name</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            ref={nameRef}
                            placeholder="*Enter userName"
                            className="form-control" 
                            onChange={()=>setCheckUserName (validUserName(nameRef.current.value))}/>
                            {checkUserName.status == false ? <div className="valid-feedback d-block text-danger">
                                {checkUserName.message}
                            </div> : ''}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-light fw-bold form-label text-center">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            placeholder="*Enter email"
                            className="form-control" 
                            onChange={()=>setCheckEmail (validEmail(emailRef.current.value))}/>
                            {checkEmail.status == false ? <div className="valid-feedback d-block text-danger">
                                {checkEmail.message}
                            </div> : ''}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-light fw-bold form-label text-center">Choose a password between 8-10</label>
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            ref={passwordRef}
                            placeholder="*Enter password"
                            className="form-control"
                            onChange={()=>setCheckPassword (validPassword(passwordRef.current.value))} />
                            {checkPassword.status == false ? <div className="valid-feedback d-block text-danger">
                                {checkPassword.message}
                            </div> : ''}
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="form-control btn btn-warning" onClick={() => req()}>SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )


})