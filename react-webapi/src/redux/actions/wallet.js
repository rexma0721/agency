import ActionTypes from './actionTypes';

export const ConnectWallet = (address, balance, role) => async dispatch => {
    try {
        dispatch({
            type : ActionTypes.ConnectWallet,
            payload : {
                balance : Number(balance),
                address,
                role
            }
        });
        
    } catch(err) {
        console.log(err) ;
    }
}