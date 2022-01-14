import {combineReducers} from 'redux';
import WalletReducer from "./WalletReducer";

const RootReducer = combineReducers({
    userWallet: WalletReducer,
});

export default RootReducer;