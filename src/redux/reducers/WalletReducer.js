import { getLineAndCharacterOfPosition } from 'typescript';
import * as ActionTypes from '../ActionTypes';

const initState = {
    loading: false,
    chainId: null,
    account: null,
    active: false
};

const WalletReducer = (state = initState, action) => {
    switch (action.type) {        
        case ActionTypes.WALLET_DISCONNECT_START:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.WALLET_DISCONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                chainId: null,
                account: null,
                active: false
            };
        case ActionTypes.WALLET_CONNECT_SUCCESS: 
            return {
                ...state,
                chainId: action.payload.chainId,
                account: action.payload.account,
                active: action.payload.active
            };
        default:
            return state;
    }
};

export default WalletReducer;