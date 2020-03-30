import { IAuthenticate, IUnauthenticate, IRefreshToken } from "../actions/userActions"
import { AUTHENTICATE, UNAUTHENTICATE, REFRESH_TOKEN, USER_LOADING, USER_LOADED, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL } from "../models/constants"
import { User } from "../models/types"

export function userReducer(
    initialState: User = {
        name: "",
        email: null,
        password: null,
        token: localStorage.getItem("token"),
        refreshToken: localStorage.getItem("refreshToken"),
        image_url: null,
        isAuthenticated: null,
        isLoading: false
    },
    action: IAuthenticate | IUnauthenticate | IRefreshToken | any,
): User {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                password: action.payload.password,
                image_url: action.payload.image_url,
                isAuthenticated: true,
                isLoading: false
            }
        case UNAUTHENTICATE:
            return {
                name: "",
                email: null,
                password: null,
                token: null,
                refreshToken: null,
                image_url: null,
                isAuthenticated: false,
                isLoading: false
            }
        case REFRESH_TOKEN:
            return {
                ...action.payload
            }
        case USER_LOADING:
            return {
                ...initialState,
                isLoading: true
            }
        case USER_LOADED:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("refreshToken", action.payload.refreshToken)
            return {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                password: action.payload.password,
                image_url: action.payload.image_url,
                isLoading: false,
                isAuthenticated: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...initialState,
                isLoading: false,
                isAuthenticated: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token")
            return {
                name: "",
                email: null,
                password: null,
                token: null,
                refreshToken: null,
                image_url: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return initialState
    }
}