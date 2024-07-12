import { AuthentificationTokens } from "@/lib/shared/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface InitialState {
    tokens?: AuthentificationTokens
}
const initialState: InitialState = {
    
}
const slice = createSlice({
    name: "authentification",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<AuthentificationTokens>)=>{
            state.tokens = action.payload
        },
        delTokens: state => state.tokens = undefined
    }
});


export default {
    reducer: slice.reducer,
    actions: slice.actions
}
