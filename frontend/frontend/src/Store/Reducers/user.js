import produce from 'immer'
import createReducer from '../Reducers/ReducerUtilis'
const initialState={
    user:{
        _id:'',
        name:'',
   email:'',
   password:'',
   token:''
    }

}



const user={
    setStoreUser(state,action){
        console.log(action.payload);
        state.user._id=action.payload.user._id
        state.user.name=action.payload.user.name
        state.user.password=action.payload.user.password
        state.user.email=action.payload.user.email
        state.user.token=action.payload.token
    }
 
}
export default produce((state,action)=>createReducer(state,action,user),initialState)