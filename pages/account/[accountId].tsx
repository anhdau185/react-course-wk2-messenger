import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import type { Conversation, PaginatedResponse, User } from 'types/api';
import { AccountPageContextValues, AccountPageContext } from 'context/accountPage';
import SidebarLayout from 'components/SidebarLayout';
import ChatView from 'components/ChatView';
import { getAccount } from '../api/account/[accountId]';

type AccountPageParams = {
  accountId: string;
};

type AccountPageProps = {
  account: User;
};

const getConversations = (accountId: string) =>
  axios.get<PaginatedResponse<Conversation>>(`/api/account/${accountId}/conversations`);

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
    getConversations(account.id).then(
      response => setConversations(response.data.rows)
    );
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
