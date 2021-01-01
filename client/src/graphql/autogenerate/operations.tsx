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

export type FindUserProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
}>;


export type FindUserProfileQuery = (
  { __typename?: 'Query' }
  & { userProfileByUserId?: Types.Maybe<(
    { __typename?: 'UserProfile' }
    & UserProfileFieldsFragment
  )> }
);

export type RegisterUserMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String'];
  lastName: Types.Scalars['String'];
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Types.Maybe<(
    { __typename?: 'RegisterUserPayload' }
    & { userProfile?: Types.Maybe<(
      { __typename?: 'UserProfile' }
      & Pick<Types.UserProfile, 'firstName'>
    )> }
  )> }
);

export type UserProfileFieldsFragment = (
  { __typename?: 'UserProfile' }
  & Pick<Types.UserProfile, 'createdAt' | 'firstName' | 'lastName' | 'updatedAt' | 'userId'>
);
