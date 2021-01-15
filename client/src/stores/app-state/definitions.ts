import { CurrentUserQuery } from "../../graphql/autogenerate/operations";

/* 
    State Object 
*/
export interface IAppState {
    jwt?: string
    user?: CurrentUserQuery
}


/* 
    Actions 
*/
export enum AppActionType {
    logout,
    setJwt,
    setUser,
}

interface IPayloadLessAction {
    type: AppActionType.logout
}

interface ISetJwtAction {
    type: AppActionType.setJwt
    payload: {
        jwt?: string
    }
}

interface ISetUserAction {
    type: AppActionType.setUser
    payload: {
        user?: CurrentUserQuery
    }
}

export type AppAction =
    IPayloadLessAction |
    ISetJwtAction |
    ISetUserAction