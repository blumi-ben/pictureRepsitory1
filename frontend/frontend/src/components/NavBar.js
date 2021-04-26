
import React from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import LogIn from './Login'
import AddPicture from './AddPicture'
import { actions } from '../Store/actions'
import SignUp from './SignUp'
import ShowPicture from './ShowPicture'
import ShowAllPictures from './ShowAllPictures'
import user from '../Store/Reducers/user'

function mapstateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    setStoreUser: (data) => dispatch(actions.setStoreUser(data))
})

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(function NavBar(props) {
    const { user, setStoreUser } = props


    return (
        <>

        
            <nav >
                <div>
                    <Menu />
                    <Switch>
                        <Route path="/login">
                            <LogIn setStoreUser={setStoreUser} />
                        </Route>
                        <Route path="/signUp">
                            <SignUp />
                        </Route>
                        <Route path="/showPicture">
                            {/* <ShowPicture user={user}></ShowPicture> */}

                            {user.token != '' ?
                        <ShowPicture user={user}></ShowPicture>
                        :
                        <Redirect to="/Login" />}
                        </Route>
                        <Route path="/showAllPictures">
                            
                        {user.token != '' ?
                            <ShowAllPictures user={user}></ShowAllPictures>:
                            <Redirect to="/Login"/>}
                        </Route>
                   <Route path="/addPicture">
                    {user.token != '' ?
                   
                      <AddPicture user={user}></AddPicture>:
                      <Redirect to="/Login"/>}
                    </Route>
                      </Switch>
                </div>
            </nav>

        </>
    );

}))

function Menu() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">pictures</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
    <Link className="nav-item nav-link active" to="/login">login</Link>
    <Link className="nav-item nav-link" to="/signUp">sign up</Link>
    <Link className="nav-item nav-link " to="/addPicture">add picture</Link>
    <Link className="nav-item nav-link " to="/showPicture">showPicture</Link>
    <Link className="nav-item nav-link " to="/showAllPictures">showAllPictures</Link>
    </div>
    <div> {user.userName}</div>
  </div>
</nav>

    );
}