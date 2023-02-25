import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    address : null,
    chainData : null,
    balance : null,
    role : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.ConnectWallet :
            return ({
                ...state , 
                address : action.payload.address,
                balance : action.payload.balance,
                role : action.payload.role
            }) ;
       
        default :
            return state ; 
    }
}