import { useEffect, useState } from 'react';
import axios from 'axios';

import type { Conversation, Message, PaginatedResponse } from 'types/api';
import { useAccountPageContext } from 'pages/account/[accountId]';
import MessageFeed from './MessageFeed';
import MessageBox from './MessageBox';
import { Center, Text } from '@chakra-ui/react';

type ChatViewProps = {
  conversation: Conversation | undefined;
};

const getMessages = (
  accountId: string | undefined,
  conversationId: string | undefined
) =>
  axios.get<PaginatedResponse<Message>>(
    `/api/account/${accountId}/conversation/${conversationId}/messages`
  );

export default function ChatView({ conversation }: ChatViewProps) {
  const { account } = useAccountPageContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const fetch = () => getMessages(account?.id, conversation?.id);
  const conversationChosen = conversation !== undefined;

  useEffect(() => {
    if (account?.id && conversation?.id) {
      fetch().then(response => setMessages(response.data.rows));
    }
  }, [account?.id, conversation?.id]);

  return conversationChosen ? (
    <>
      <MessageFeed messages={messages} />
      <MessageBox refetchMessages={fetch} />
    </>
  ) : (
    <Center h="100%">
      <Text fontSize="lg" color="gray.600">
        No conversation chosen.
      </Text>
    </Center>
  );
}
