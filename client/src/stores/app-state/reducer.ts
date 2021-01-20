import { AppAction, AppActionType, IAppState } from "./definitions";

export const reducer = (state: IAppState, action: AppAction): IAppState => {
    switch (action.type) {
        case AppActionType.bootstrap:
            return { ...state, bootstrapped: true, ...action.payload }
        case AppActionType.login:
            return { ...state, authed: true }
        case AppActionType.logout:
            return { ...state, authed: false }
        default:
            throw new Error('App State action not yet implemented.')
    }
}