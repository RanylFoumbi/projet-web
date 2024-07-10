/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    '\n    query GetConversationMessages($convId: ID!) {\n        getConversationMessages(convId: $convId) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n':
        types.GetConversationMessagesDocument,
    '\n    mutation SendMessage($messageInput: MessageInput!) {\n        sendMessage(messageInput: $messageInput) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n':
        types.SendMessageDocument,
    '\n    mutation RefreshToken {\n        refreshToken\n    }\n': types.RefreshTokenDocument,
    '\n    mutation Login($loginInput: LoginDto!) {\n        login(loginInput: $loginInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n                conversations {\n                    createdAt\n                    id\n                    updatedAt\n                    messages {\n                        content\n                        createdAt\n                        id\n                        updatedAt\n                    }\n                    users {\n                        createdAt\n                        email\n                        id\n                        password\n                        updatedAt\n                        username\n                    }\n                }\n            }\n        }\n    }\n':
        types.LoginDocument,
    '\n    mutation Register($registerInput: RegisterDto!) {\n        register(registerInput: $registerInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n':
        types.RegisterDocument,
    '\n    mutation Logout {\n        logout\n    }\n': types.LogoutDocument,
    '\n    mutation CreateConversation($convInput: CreateConversationDto!) {\n        createConversation(convInput: $convInput) {\n            createdAt\n            id\n            name\n            updatedAt\n            creatorId\n            messages {\n                content\n                createdAt\n                id\n                updatedAt\n            }\n            users {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n':
        types.CreateConversationDocument,
    '\n    query GetUserConversations($userId: ID!) {\n        getUserConversations(userId: $userId) {\n            id\n            name\n            creatorId\n            users {\n                id\n                username\n            }\n            messages {\n                id\n                content\n                createdAt\n                updatedAt\n            }\n            createdAt\n            updatedAt\n        }\n    }\n':
        types.GetUserConversationsDocument,
    '\n    query FindUserByName($query: String!) {\n        findUserByName(query: $query) {\n            createdAt\n            email\n            id\n            password\n            updatedAt\n            username\n        }\n    }\n':
        types.FindUserByNameDocument,
    '\n    mutation DeleteConversation($convId: ID!, $userId: ID!) {\n        deleteConversation(convId: $convId, userId: $userId) {\n            createdAt\n            id\n            name\n            creatorId\n            updatedAt\n        }\n    }\n':
        types.DeleteConversationDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetConversationMessages($convId: ID!) {\n        getConversationMessages(convId: $convId) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n',
): (typeof documents)['\n    query GetConversationMessages($convId: ID!) {\n        getConversationMessages(convId: $convId) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation SendMessage($messageInput: MessageInput!) {\n        sendMessage(messageInput: $messageInput) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n',
): (typeof documents)['\n    mutation SendMessage($messageInput: MessageInput!) {\n        sendMessage(messageInput: $messageInput) {\n            content\n            createdAt\n            id\n            updatedAt\n            conversation {\n                createdAt\n                id\n                name\n                updatedAt\n            }\n            sender {\n                createdAt\n                id\n                username\n                updatedAt\n            }\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation RefreshToken {\n        refreshToken\n    }\n',
): (typeof documents)['\n    mutation RefreshToken {\n        refreshToken\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation Login($loginInput: LoginDto!) {\n        login(loginInput: $loginInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n                conversations {\n                    createdAt\n                    id\n                    updatedAt\n                    messages {\n                        content\n                        createdAt\n                        id\n                        updatedAt\n                    }\n                    users {\n                        createdAt\n                        email\n                        id\n                        password\n                        updatedAt\n                        username\n                    }\n                }\n            }\n        }\n    }\n',
): (typeof documents)['\n    mutation Login($loginInput: LoginDto!) {\n        login(loginInput: $loginInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n                conversations {\n                    createdAt\n                    id\n                    updatedAt\n                    messages {\n                        content\n                        createdAt\n                        id\n                        updatedAt\n                    }\n                    users {\n                        createdAt\n                        email\n                        id\n                        password\n                        updatedAt\n                        username\n                    }\n                }\n            }\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation Register($registerInput: RegisterDto!) {\n        register(registerInput: $registerInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n',
): (typeof documents)['\n    mutation Register($registerInput: RegisterDto!) {\n        register(registerInput: $registerInput) {\n            user {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation Logout {\n        logout\n    }\n',
): (typeof documents)['\n    mutation Logout {\n        logout\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation CreateConversation($convInput: CreateConversationDto!) {\n        createConversation(convInput: $convInput) {\n            createdAt\n            id\n            name\n            updatedAt\n            creatorId\n            messages {\n                content\n                createdAt\n                id\n                updatedAt\n            }\n            users {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n',
): (typeof documents)['\n    mutation CreateConversation($convInput: CreateConversationDto!) {\n        createConversation(convInput: $convInput) {\n            createdAt\n            id\n            name\n            updatedAt\n            creatorId\n            messages {\n                content\n                createdAt\n                id\n                updatedAt\n            }\n            users {\n                createdAt\n                email\n                id\n                password\n                updatedAt\n                username\n            }\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetUserConversations($userId: ID!) {\n        getUserConversations(userId: $userId) {\n            id\n            name\n            creatorId\n            users {\n                id\n                username\n            }\n            messages {\n                id\n                content\n                createdAt\n                updatedAt\n            }\n            createdAt\n            updatedAt\n        }\n    }\n',
): (typeof documents)['\n    query GetUserConversations($userId: ID!) {\n        getUserConversations(userId: $userId) {\n            id\n            name\n            creatorId\n            users {\n                id\n                username\n            }\n            messages {\n                id\n                content\n                createdAt\n                updatedAt\n            }\n            createdAt\n            updatedAt\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query FindUserByName($query: String!) {\n        findUserByName(query: $query) {\n            createdAt\n            email\n            id\n            password\n            updatedAt\n            username\n        }\n    }\n',
): (typeof documents)['\n    query FindUserByName($query: String!) {\n        findUserByName(query: $query) {\n            createdAt\n            email\n            id\n            password\n            updatedAt\n            username\n        }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation DeleteConversation($convId: ID!, $userId: ID!) {\n        deleteConversation(convId: $convId, userId: $userId) {\n            createdAt\n            id\n            name\n            creatorId\n            updatedAt\n        }\n    }\n',
): (typeof documents)['\n    mutation DeleteConversation($convId: ID!, $userId: ID!) {\n        deleteConversation(convId: $convId, userId: $userId) {\n            createdAt\n            id\n            name\n            creatorId\n            updatedAt\n        }\n    }\n']

export function graphql(source: string) {
    return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
    TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
