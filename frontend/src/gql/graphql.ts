/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: { input: any; output: any }
    /** The `Upload` scalar type represents a file upload. */
    Upload: { input: any; output: any }
}

/** Conversation model */
export type Conversation = {
    __typename?: 'Conversation'
    createdAt?: Maybe<Scalars['DateTime']['output']>
    creatorId: Scalars['ID']['output']
    id: Scalars['ID']['output']
    messages: Array<Message>
    name: Scalars['String']['output']
    updatedAt?: Maybe<Scalars['DateTime']['output']>
    users: Array<User>
}

export type CreateConversationDto = {
    creatorId: Scalars['ID']['input']
    name: Scalars['String']['input']
    users: Array<Scalars['ID']['input']>
}

export type LoginDto = {
    email: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type LoginResponse = {
    __typename?: 'LoginResponse'
    user: User
}

/** Message model */
export type Message = {
    __typename?: 'Message'
    content: Scalars['String']['output']
    conversation?: Maybe<Conversation>
    createdAt: Scalars['DateTime']['output']
    id: Scalars['ID']['output']
    sender?: Maybe<User>
    updatedAt: Scalars['DateTime']['output']
}

/** Message input model */
export type MessageInput = {
    content: Scalars['String']['input']
    conversation: Scalars['ID']['input']
    sender: Scalars['ID']['input']
}

export type Mutation = {
    __typename?: 'Mutation'
    createConversation: Conversation
    deleteConversation: Conversation
    leaveConversation: Conversation
    login: LoginResponse
    logout: Scalars['String']['output']
    refreshToken: Scalars['String']['output']
    register: RegisterResponse
    sendMessage: Message
    updateProfile: User
}

export type MutationCreateConversationArgs = {
    convInput: CreateConversationDto
}

export type MutationDeleteConversationArgs = {
    convId: Scalars['ID']['input']
    userId: Scalars['ID']['input']
}

export type MutationLeaveConversationArgs = {
    convId: Scalars['ID']['input']
    userId: Scalars['ID']['input']
}

export type MutationLoginArgs = {
    loginInput: LoginDto
}

export type MutationRegisterArgs = {
    registerInput: RegisterDto
}

export type MutationSendMessageArgs = {
    messageInput: MessageInput
}

export type MutationUpdateProfileArgs = {
    file?: InputMaybe<Scalars['Upload']['input']>
    username: Scalars['String']['input']
}

export type Query = {
    __typename?: 'Query'
    findUserByName: Array<User>
    getConversationMessages: Array<Message>
    getUserConversations: Array<Conversation>
    health: Scalars['String']['output']
    healthCheck: Scalars['String']['output']
}

export type QueryFindUserByNameArgs = {
    query: Scalars['String']['input']
}

export type QueryGetConversationMessagesArgs = {
    convId: Scalars['ID']['input']
}

export type QueryGetUserConversationsArgs = {
    userId: Scalars['ID']['input']
}

export type RegisterDto = {
    confirmPassword: Scalars['String']['input']
    email: Scalars['String']['input']
    password: Scalars['String']['input']
    username: Scalars['String']['input']
}

export type RegisterResponse = {
    __typename?: 'RegisterResponse'
    user?: Maybe<User>
}

export type Subscription = {
    __typename?: 'Subscription'
    newMessage?: Maybe<Message>
}

export type SubscriptionNewMessageArgs = {
    convId: Scalars['String']['input']
}

/** User model */
export type User = {
    __typename?: 'User'
    conversations: Array<Conversation>
    createdAt?: Maybe<Scalars['DateTime']['output']>
    email: Scalars['String']['output']
    id: Scalars['ID']['output']
    password?: Maybe<Scalars['String']['output']>
    updatedAt?: Maybe<Scalars['DateTime']['output']>
    username: Scalars['String']['output']
}

export type GetConversationMessagesQueryVariables = Exact<{
    convId: Scalars['ID']['input']
}>

export type GetConversationMessagesQuery = {
    __typename?: 'Query'
    getConversationMessages: Array<{
        __typename?: 'Message'
        content: string
        createdAt: any
        id: string
        updatedAt: any
        conversation?: {
            __typename?: 'Conversation'
            createdAt?: any | null
            id: string
            name: string
            updatedAt?: any | null
        } | null
        sender?: {
            __typename?: 'User'
            createdAt?: any | null
            id: string
            username: string
            updatedAt?: any | null
        } | null
    }>
}

export type SendMessageMutationVariables = Exact<{
    messageInput: MessageInput
}>

export type SendMessageMutation = {
    __typename?: 'Mutation'
    sendMessage: {
        __typename?: 'Message'
        content: string
        createdAt: any
        id: string
        updatedAt: any
        conversation?: {
            __typename?: 'Conversation'
            createdAt?: any | null
            id: string
            name: string
            updatedAt?: any | null
        } | null
        sender?: {
            __typename?: 'User'
            createdAt?: any | null
            id: string
            username: string
            updatedAt?: any | null
        } | null
    }
}

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>

export type RefreshTokenMutation = { __typename?: 'Mutation'; refreshToken: string }

export type LoginMutationVariables = Exact<{
    loginInput: LoginDto
}>

export type LoginMutation = {
    __typename?: 'Mutation'
    login: {
        __typename?: 'LoginResponse'
        user: {
            __typename?: 'User'
            createdAt?: any | null
            email: string
            id: string
            password?: string | null
            updatedAt?: any | null
            username: string
            conversations: Array<{
                __typename?: 'Conversation'
                createdAt?: any | null
                id: string
                updatedAt?: any | null
                messages: Array<{ __typename?: 'Message'; content: string; createdAt: any; id: string; updatedAt: any }>
                users: Array<{
                    __typename?: 'User'
                    createdAt?: any | null
                    email: string
                    id: string
                    password?: string | null
                    updatedAt?: any | null
                    username: string
                }>
            }>
        }
    }
}

export type RegisterMutationVariables = Exact<{
    registerInput: RegisterDto
}>

export type RegisterMutation = {
    __typename?: 'Mutation'
    register: {
        __typename?: 'RegisterResponse'
        user?: {
            __typename?: 'User'
            createdAt?: any | null
            email: string
            id: string
            password?: string | null
            updatedAt?: any | null
            username: string
        } | null
    }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: string }

export type CreateConversationMutationVariables = Exact<{
    convInput: CreateConversationDto
}>

export type CreateConversationMutation = {
    __typename?: 'Mutation'
    createConversation: {
        __typename?: 'Conversation'
        createdAt?: any | null
        id: string
        name: string
        updatedAt?: any | null
        creatorId: string
        messages: Array<{ __typename?: 'Message'; content: string; createdAt: any; id: string; updatedAt: any }>
        users: Array<{
            __typename?: 'User'
            createdAt?: any | null
            email: string
            id: string
            password?: string | null
            updatedAt?: any | null
            username: string
        }>
    }
}

export type GetUserConversationsQueryVariables = Exact<{
    userId: Scalars['ID']['input']
}>

export type GetUserConversationsQuery = {
    __typename?: 'Query'
    getUserConversations: Array<{
        __typename?: 'Conversation'
        id: string
        name: string
        creatorId: string
        createdAt?: any | null
        updatedAt?: any | null
        users: Array<{ __typename?: 'User'; id: string; username: string }>
        messages: Array<{ __typename?: 'Message'; id: string; content: string; createdAt: any; updatedAt: any }>
    }>
}

export type FindUserByNameQueryVariables = Exact<{
    query: Scalars['String']['input']
}>

export type FindUserByNameQuery = {
    __typename?: 'Query'
    findUserByName: Array<{
        __typename?: 'User'
        createdAt?: any | null
        email: string
        id: string
        password?: string | null
        updatedAt?: any | null
        username: string
    }>
}

export type DeleteConversationMutationVariables = Exact<{
    convId: Scalars['ID']['input']
    userId: Scalars['ID']['input']
}>

export type DeleteConversationMutation = {
    __typename?: 'Mutation'
    deleteConversation: {
        __typename?: 'Conversation'
        createdAt?: any | null
        id: string
        name: string
        creatorId: string
        updatedAt?: any | null
    }
}

export const GetConversationMessagesDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetConversationMessages' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'convId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getConversationMessages' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'convId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'convId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'conversation' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sender' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>
export const SendMessageDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SendMessage' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'messageInput' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'MessageInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sendMessage' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'messageInput' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'messageInput' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'conversation' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sender' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>
export const RefreshTokenDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'RefreshToken' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'refreshToken' } }],
            },
        },
    ],
} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>
export const LoginDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Login' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'loginInput' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'LoginDto' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'login' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'loginInput' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'loginInput' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'conversations' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'messages' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'content' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'createdAt' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'id' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'updatedAt' },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'users' },
                                                            selectionSet: {
                                                                kind: 'SelectionSet',
                                                                selections: [
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'createdAt' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'email' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'id' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'password' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'updatedAt' },
                                                                    },
                                                                    {
                                                                        kind: 'Field',
                                                                        name: { kind: 'Name', value: 'username' },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const RegisterDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Register' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'registerInput' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'RegisterDto' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'register' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'registerInput' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'registerInput' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'user' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
export const LogoutDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'Logout' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }],
            },
        },
    ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>
export const CreateConversationDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateConversation' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'convInput' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateConversationDto' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createConversation' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'convInput' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'convInput' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'messages' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'users' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>
export const GetUserConversationsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetUserConversations' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getUserConversations' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'userId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'users' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'messages' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetUserConversationsQuery, GetUserConversationsQueryVariables>
export const FindUserByNameDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FindUserByName' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'findUserByName' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'query' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FindUserByNameQuery, FindUserByNameQueryVariables>
export const DeleteConversationDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteConversation' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'convId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteConversation' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'convId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'convId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'userId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'creatorId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DeleteConversationMutation, DeleteConversationMutationVariables>
