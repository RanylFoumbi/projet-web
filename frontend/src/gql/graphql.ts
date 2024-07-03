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
    createdAt?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    messages: Array<Message>
    updatedAt?: Maybe<Scalars['String']['output']>
    users: Array<User>
}

export type CreateConversationDto = {
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
    getConversationMessages: Array<Message>
    getUserConversations: Array<Conversation>
    health: Scalars['String']['output']
    healthCheck: Scalars['String']['output']
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

/** User model */
export type User = {
    __typename?: 'User'
    conversations?: Maybe<Array<Conversation>>
    createdAt?: Maybe<Scalars['DateTime']['output']>
    email: Scalars['String']['output']
    id: Scalars['ID']['output']
    password?: Maybe<Scalars['String']['output']>
    updatedAt?: Maybe<Scalars['DateTime']['output']>
    username: Scalars['String']['output']
}

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
            conversations?: Array<{
                __typename?: 'Conversation'
                createdAt?: string | null
                id: string
                updatedAt?: string | null
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
            }> | null
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
