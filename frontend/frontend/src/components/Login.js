
import {connect} from 'react-redux'
import {actions} from '../Store/actions'
import { Link, withRouter} from 'react-router-dom'
import { forgotPasswordServer, loginServer } from './connectServer/userController'
import React, {  useRef, useState } from 'react'
import { validEmail, validPassword, validUserName } from './validation'

 

// function mapStateToProps(state) {
//   return {
//     user: state.userReducer.user
//   };
// }

// const mapDispatchToProps=(dispatch)=>({
//     setName:(name)=>(dispatch(actions.setName(name)))  ,
//     setPassword:(password)=>(dispatch(actions.setPassword(password))),
//     setEmail:(email)=>(dispatch(actions.setEmail(email)))
  
// })

//export default connect(mapStateToProps,mapDispatchToProps)(function Login(props){
export default withRouter(function  Login(props){
    const [checkUserName, setCheckUserName] = useState({ status: false, message: '' })
    const [checkPassword, setCheckPassword] = useState({ status: false, message: '' })
    const [checkEmail, setCheckEmail] = useState({ status: false, message: '' })
    const [name, setName] = useState('')
    const passwordRef = useRef('')
    const emailRef = useRef('')
    const setStoreUser = props.setStoreUser

const [password,setPassword]=useState('')
    async function req() {
      
 debugger;
     console.log('hi')
            const res = await loginServer(name, passwordRef.current.value)
            console.log('from componnent:', res.status);
          if(res.status==200)
            {   
                console.log(res.data.user);
                 await setStoreUser(res.data)
                  return props.history.push('/ShowPicture')
            }
            else{

            alert('not found')
            }
        }

   // async function forgotPassword(em)

   async function reqForgotPass() {
    console.log('here!!');
    debugger;
    if (name != '' && emailRef.current.value != '') {
        console.log(name, emailRef.current.value);
        const res = await forgotPasswordServer(name, emailRef.current.value)
        console.log(res);
        if (res.status == 200)
        {    console.log('componnent', res);
            alert('passord sent to your email')}
        else console.log(res.response.data);
        emailRef.current.value = ''
    }
}


    return(
    

    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col-6 m-auto mt-3 ">
                <div className="card card-body bg-secondary border border-3 border-warning rounded">
                    <h3 className="text-center text-warning">Log in</h3>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={name}
                            placeholder="*Enter userName"
                            className="form-control"
                            onChange={(e) => { setName(e.target.value); setCheckUserName(validUserName(name)) }} />
                        {checkUserName.status == false ? <div className="valid-feedback d-block text-danger">
                            {checkUserName.message}
                        </div> : ''}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            ref={passwordRef}
                            placeholder="*Enter password"
                            className="form-control"
                            onChange={() => { setCheckPassword(validPassword(passwordRef.current.value)) }} />
                        {checkPassword.status == false ? <div className="valid-feedback d-block text-danger">
                            {checkPassword.message}
                        </div> : ''}
                    </div>
                    <div className="mb-3">
                        <button type="submit"
                            className="form-control btn btn-warning"
                            onClick={() => req()}> Login</button>

                    </div>
                    <div className="mb-3 text-center ">
                        <a href='#' data-toggle="modal" data-target="#exampleModal" className=" link-warning">Forgot Password</a>
                    </div>
                    <div className="mb-3 text-center">
                        <label className="text-warning">Want to join us?</label><a href='#' className="link-warning" onClick={() => { return props.history.push('/SignUp') }}> signUp</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* modal */}
    <div className="modal fade " id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
            <div className="modal-content bg-secondary">
                <div className="modal-header">
                    <h5 className="modal-title text-warning" id="exampleModalLabel">Enter your mail</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body bg-light">
                    <div className="input-group mb-3">
                        <input type="email" ref={emailRef} className="form-control" placeholder="*Email..." aria-label="*Email..." aria-describedby="basic-addon2"
                            onChange={() => { setCheckEmail(validEmail(emailRef.current.value)) }} />
                        <span className="input-group-text" id="basic-addon2">@example.com</span>
                        {checkEmail.status == false ? <div className="valid-feedback d-block text-danger">
                            {checkEmail.message}
                        </div> : ''}
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" value={name} className="form-control" placeholder="*User name..." aria-label="*User name..." aria-describedby="basic-addon2"
                            onChange={(e) => { setName(e.target.value); setCheckUserName(validUserName(name)) }} />
                        <span className="input-group-text" id="basic-addon2">UserName</span>
                        {checkUserName.status == false ? <div className="valid-feedback d-block text-danger">
                            {checkUserName.message}
                        </div> : ''}
                    </div>
                </div>
                <div className="modal-footer bg-light">
                    <p className="float-start text-secondary" >If you have identification, password will be sent to your email</p>
                    <button type="button" data-bs-dismiss="modal" className="btn btn-warning text-light" onClick={() => reqForgotPass()}>Send</button>

                </div>

            </div>
        </div>
    </div>
</>
)


}


)