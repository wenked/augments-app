import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Augment = {
  __typename?: 'Augment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  img: Scalars['String'];
  name: Scalars['String'];
  pickrate: Scalars['String'];
  placement: Scalars['String'];
  stage14: Scalars['String'];
  stage33: Scalars['String'];
  stage46: Scalars['String'];
  tier: Scalars['String'];
  top4: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  winrate: Scalars['String'];
};

export type Historic_Stats = {
  __typename?: 'Historic_Stats';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  progresso: Scalars['Float'];
  status: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Augments: Array<Augment>;
  Send_to_queue: Historic_Stats;
  get_Historic_Stats: Historic_Stats;
};


export type QueryGet_Historic_StatsArgs = {
  id: Scalars['Float'];
};

export type GetAugmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAugmentsQuery = { __typename?: 'Query', Augments: Array<{ __typename?: 'Augment', id: string, name: string, tier: string, top4: string, winrate: string, stage14: string, stage33: string, stage46: string, pickrate: string, placement: string, createdAt: any, updatedAt: any }> };


export const GetAugmentsDocument = `
    query GetAugments {
  Augments {
    id
    name
    tier
    top4
    winrate
    stage14
    stage33
    stage46
    pickrate
    placement
    createdAt
    updatedAt
  }
}
    `;
export const useGetAugmentsQuery = <
      TData = GetAugmentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAugmentsQueryVariables,
      options?: UseQueryOptions<GetAugmentsQuery, TError, TData>
    ) =>
    useQuery<GetAugmentsQuery, TError, TData>(
      variables === undefined ? ['GetAugments'] : ['GetAugments', variables],
      fetcher<GetAugmentsQuery, GetAugmentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAugmentsDocument, variables),
      options
    );