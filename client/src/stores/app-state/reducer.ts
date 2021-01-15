import { AppAction, AppActionType, IAppState } from "./definitions";

export const reducer = (state: IAppState, action: AppAction): IAppState => {
    switch (action.type) {
        case AppActionType.logout:
            return { ...state, user: undefined, jwt: undefined }
        case AppActionType.setUser:
            return { ...state, user: action.payload.user }
        case AppActionType.setJwt:
            return { ...state, jwt: action.payload.jwt }
        default:
            throw new Error('App State action not yet implemented.')
    }
}