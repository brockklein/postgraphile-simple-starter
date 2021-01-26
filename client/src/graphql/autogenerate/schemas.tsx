export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Gets the user who was identified by our JWT. */
  currentUser?: Maybe<UserProfile>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * `user_profile` is a user's publicly visible demographic information. <br><br>
 * 
 * A profile maintains a one-to-one connection with a user's `user_account` via the `user_id` foreign key. This is used as the primary key on this table to enforce the one-to-one relationship and not allow a one-to-many (more than one `user_profile` for a `user_account`).
 */
export type UserProfile = Node & {
  __typename?: 'UserProfile';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** A foreign key reference to the user's `user_id` in their `user_account` record. */
  userId: Scalars['UUID'];
  /** When the user's profile was created. */
  createdAt: Scalars['Datetime'];
  /** The last time the user's profile was updated. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** The user's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>;
  /** A user's full name which is a concatenation of their first and last name. */
  fullName?: Maybe<Scalars['String']>;
};



/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Updates a single `UserProfile` using its globally unique id and a patch. */
  updateUserProfileByNodeId?: Maybe<UpdateUserProfilePayload>;
  /** Updates a single `UserProfile` using a unique key and a patch. */
  updateUserProfile?: Maybe<UpdateUserProfilePayload>;
  /** Deletes a single `UserProfile` using its globally unique id. */
  deleteUserProfileByNodeId?: Maybe<DeleteUserProfilePayload>;
  /** Deletes a single `UserProfile` using a unique key. */
  deleteUserProfile?: Maybe<DeleteUserProfilePayload>;
  /** Creates a JWT token that will securely identify a user and give them certain permissions. This token expires in 5 days. */
  authenticate?: Maybe<AuthenticatePayload>;
  /** Registers a single user creating their profile (user_profile) and an account (user_account). */
  registerUser?: Maybe<RegisterUserPayload>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserProfileByNodeIdArgs = {
  input: UpdateUserProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserProfileByNodeIdArgs = {
  input: DeleteUserProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserProfileArgs = {
  input: DeleteUserProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendPasswordResetEmailArgs = {
  input: SendPasswordResetEmailInput;
};

/** The output of our update `UserProfile` mutation. */
export type UpdateUserProfilePayload = {
  __typename?: 'UpdateUserProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserProfile` that was updated by this mutation. */
  userProfile?: Maybe<UserProfile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateUserProfileByNodeId` mutation. */
export type UpdateUserProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserProfile` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserProfile` being updated. */
  patch: UserProfilePatch;
};

/** Represents an update to a `UserProfile`. Fields that are set will be updated. */
export type UserProfilePatch = {
  /** A foreign key reference to the user's `user_id` in their `user_account` record. */
  userId?: Maybe<Scalars['UUID']>;
  /** When the user's profile was created. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** The last time the user's profile was updated. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** The user's first name. */
  firstName?: Maybe<Scalars['String']>;
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>;
};

/** All input for the `updateUserProfile` mutation. */
export type UpdateUserProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserProfile` being updated. */
  patch: UserProfilePatch;
  /** A foreign key reference to the user's `user_id` in their `user_account` record. */
  userId: Scalars['UUID'];
};

/** The output of our delete `UserProfile` mutation. */
export type DeleteUserProfilePayload = {
  __typename?: 'DeleteUserProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserProfile` that was deleted by this mutation. */
  userProfile?: Maybe<UserProfile>;
  deletedUserProfileNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteUserProfileByNodeId` mutation. */
export type DeleteUserProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserProfile` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserProfile` mutation. */
export type DeleteUserProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** A foreign key reference to the user's `user_id` in their `user_account` record. */
  userId: Scalars['UUID'];
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `registerUser` mutation. */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `registerUser` mutation. */
export type RegisterUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  _email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  boolean?: Maybe<Scalars['Boolean']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['UUID'];
  resetToken: Scalars['String'];
  newPassword: Scalars['String'];
};

/** The output of our `sendPasswordResetEmail` mutation. */
export type SendPasswordResetEmailPayload = {
  __typename?: 'SendPasswordResetEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `sendPasswordResetEmail` mutation. */
export type SendPasswordResetEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  _email: Scalars['String'];
};
