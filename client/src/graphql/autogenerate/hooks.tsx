import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export const UserProfileFieldsFragmentDoc = gql`
    fragment UserProfileFields on UserProfile {
  createdAt
  firstName
  lastName
  updatedAt
  userId
}
    `;
export const AuthenticateDocument = gql`
    mutation Authenticate($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    clientMutationId
    jwtToken
    query {
      nodeId
      currentUser {
        ...UserProfileFields
      }
    }
  }
}
    ${UserProfileFieldsFragmentDoc}`;
export type AuthenticateMutationFn = Apollo.MutationFunction<Types.AuthenticateMutation, Types.AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<Types.AuthenticateMutation, Types.AuthenticateMutationVariables>) {
        return Apollo.useMutation<Types.AuthenticateMutation, Types.AuthenticateMutationVariables>(AuthenticateDocument, baseOptions);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<Types.AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<Types.AuthenticateMutation, Types.AuthenticateMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    firstName
    lastName
    userId
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) {
        return Apollo.useQuery<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>;
export const FindUserProfileDocument = gql`
    query findUserProfile($userId: UUID!) {
  userProfileByUserId(userId: $userId) {
    ...UserProfileFields
  }
}
    ${UserProfileFieldsFragmentDoc}`;

/**
 * __useFindUserProfileQuery__
 *
 * To run a query within a React component, call `useFindUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserProfileQuery(baseOptions: Apollo.QueryHookOptions<Types.FindUserProfileQuery, Types.FindUserProfileQueryVariables>) {
        return Apollo.useQuery<Types.FindUserProfileQuery, Types.FindUserProfileQueryVariables>(FindUserProfileDocument, baseOptions);
      }
export function useFindUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FindUserProfileQuery, Types.FindUserProfileQueryVariables>) {
          return Apollo.useLazyQuery<Types.FindUserProfileQuery, Types.FindUserProfileQueryVariables>(FindUserProfileDocument, baseOptions);
        }
export type FindUserProfileQueryHookResult = ReturnType<typeof useFindUserProfileQuery>;
export type FindUserProfileLazyQueryHookResult = ReturnType<typeof useFindUserProfileLazyQuery>;
export type FindUserProfileQueryResult = Apollo.QueryResult<Types.FindUserProfileQuery, Types.FindUserProfileQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  registerUser(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    userProfile {
      firstName
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<Types.RegisterUserMutation, Types.RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.RegisterUserMutation, Types.RegisterUserMutationVariables>) {
        return Apollo.useMutation<Types.RegisterUserMutation, Types.RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<Types.RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<Types.RegisterUserMutation, Types.RegisterUserMutationVariables>;