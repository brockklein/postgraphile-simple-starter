import * as Types from './schemas';

export type AuthenticateMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate?: Types.Maybe<(
    { __typename?: 'AuthenticatePayload' }
    & Pick<Types.AuthenticatePayload, 'clientMutationId' | 'jwtToken'>
    & { query?: Types.Maybe<(
      { __typename?: 'Query' }
      & Pick<Types.Query, 'nodeId'>
      & { currentUser?: Types.Maybe<(
        { __typename?: 'UserProfile' }
        & UserProfileFieldsFragment
      )> }
    )> }
  )> }
);

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Types.Maybe<(
    { __typename?: 'UserProfile' }
    & Pick<Types.UserProfile, 'firstName' | 'lastName' | 'userId'>
  )> }
);

export type ForgotPasswordMutationVariables = Types.Exact<{
  _email: Types.Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { sendPasswordResetEmail?: Types.Maybe<(
    { __typename?: 'SendPasswordResetEmailPayload' }
    & Pick<Types.SendPasswordResetEmailPayload, 'clientMutationId'>
  )> }
);

export type RegisterUserMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
  _email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Types.Maybe<(
    { __typename?: 'RegisterUserPayload' }
    & Pick<Types.RegisterUserPayload, 'jwtToken'>
  )> }
);

export type ResetPasswordMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  resetToken: Types.Scalars['String'];
  newPassword: Types.Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Types.Maybe<(
    { __typename?: 'ResetPasswordPayload' }
    & Pick<Types.ResetPasswordPayload, 'boolean'>
  )> }
);

export type UserProfileFieldsFragment = (
  { __typename?: 'UserProfile' }
  & Pick<Types.UserProfile, 'createdAt' | 'firstName' | 'lastName' | 'updatedAt' | 'userId'>
);
