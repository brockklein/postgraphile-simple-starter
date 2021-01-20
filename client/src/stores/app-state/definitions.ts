
/* 
    State Object 
*/
export interface IAppState {
    bootstrapped?: boolean // Has the app been started up?
    authed?: boolean
}


/* 
    Actions 
*/
export enum AppActionType {
    bootstrap,
    login,
    logout,
}

interface IPayloadLessAction {
    type:
    AppActionType.login |
    AppActionType.logout
}

interface IBootstrapAction {
    type: AppActionType.bootstrap
    payload: {
        authed: boolean
    }
}


export type AppAction =
    IPayloadLessAction |
    IBootstrapAction
