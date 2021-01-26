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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($_email: String!) {
  sendPasswordResetEmail(input: {_email: $_email}) {
    clientMutationId
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<Types.ForgotPasswordMutation, Types.ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      _email: // value for '_email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<Types.ForgotPasswordMutation, Types.ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<Types.ForgotPasswordMutation, Types.ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<Types.ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<Types.ForgotPasswordMutation, Types.ForgotPasswordMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($firstName: String!, $lastName: String!, $_email: String!, $password: String!) {
  registerUser(
    input: {firstName: $firstName, lastName: $lastName, _email: $_email, password: $password}
  ) {
    jwtToken
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
 *      _email: // value for '_email'
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: UUID!, $resetToken: String!, $newPassword: String!) {
  resetPassword(
    input: {userId: $userId, resetToken: $resetToken, newPassword: $newPassword}
  ) {
    boolean
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      resetToken: // value for 'resetToken'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>) {
        return Apollo.useMutation<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<Types.ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>;