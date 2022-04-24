import type { GetServerSideProps, NextPage } from 'next';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Center, Text } from '@chakra-ui/react';
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

const AccountPage: NextPage<AccountPageProps> = ({ account }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const conversationChosen = currentConversation !== undefined;

  const contextValue = useMemo<AccountPageContextValues>(
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
    <AccountPageContext.Provider value={contextValue}>
      <SidebarLayout>
        {conversationChosen
          ? <ChatView conversation={currentConversation} />
          : (
            <Center h="100%">
              <Text fontSize="lg" color="gray.600">
                No conversation chosen.
              </Text>
            </Center>
          )}
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
