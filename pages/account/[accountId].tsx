import type { GetServerSideProps, NextPage } from 'next';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import type { Conversation, PaginatedResponse } from 'types/api';
import SidebarLayout from 'components/SidebarLayout';
import ChatView from 'components/ChatView';
import { getAccount } from '../api/account/[accountId]';
import type {
  AccountPageParams,
  AccountPageProps,
  AccountPageContextValues
} from './types';

export const AccountPageContext =
  createContext<AccountPageContextValues>({ conversations: [] });

export const useAccountPageData = () => useContext(AccountPageContext);

const AccountPage: NextPage<AccountPageProps> = ({ account }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation>();

  const contextValues = useMemo<AccountPageContextValues>(
    () => ({
      account,
      conversations,
      currentConversation,
      setCurrentConversation
    }),
    [account, conversations, currentConversation]
  );

  useEffect(() => {
    axios.get<PaginatedResponse<Conversation>>(`/api/account/${account.id}/conversations`)
      .then(response => setConversations(response.data.rows));
  }, [account.id]);

  return (
    <AccountPageContext.Provider value={contextValues}>
      <SidebarLayout>
        <ChatView conversation={currentConversation} />
      </SidebarLayout>
    </AccountPageContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<
  AccountPageProps,
  AccountPageParams
> = async context => {
  const { accountId } = context.params as AccountPageParams;
  const account = await getAccount(accountId);

  return {
    props: { account }
  };
};

export default AccountPage;
