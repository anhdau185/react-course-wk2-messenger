import { useCallback, useEffect, useState } from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

import type { Conversation, Message, PaginatedResponse } from 'types/api';
import { useAccountPageData } from 'context/accountPage';
import MessageFeed from './MessageFeed';
import MessageBox from './MessageBox';
import MobileChatHeader from './MobileChatHeader';
import DesktopChatHeader from './DesktopChatHeader';

type ChatViewProps = {
  conversation: Conversation | undefined;
};

const getMessages = ({
  accountId,
  conversationId
}: {
  accountId: string | undefined,
  conversationId: string | undefined
}) =>
  axios.get<PaginatedResponse<Message>>(
    `/api/account/${accountId}/conversation/${conversationId}/messages`
  );

export default function ChatView({ conversation }: ChatViewProps) {
  const { account } = useAccountPageData();
  const [messages, setMessages] = useState<Message[]>([]);
  const conversationChosen = conversation !== undefined;

  const fetchData = useCallback(
    () => getMessages({
      accountId: account?.id,
      conversationId: conversation?.id
    }),
    [account?.id, conversation?.id]
  );

  useEffect(() => {
    if (account?.id && conversation?.id) {
      fetchData().then(
        response => setMessages(response.data.rows)
      );
    }
  }, [account?.id, conversation?.id]);

  return (
    <Flex flexDir="column" w="100%" h="100%">
      <MobileChatHeader />
      <DesktopChatHeader />
      {conversationChosen ? (
        <>
          <MessageFeed messages={messages} />
          <MessageBox updateMessages={setMessages} />
        </>
      ) : (
        <Center flexGrow={1}>
          <Text fontSize="lg" color="gray.600">
            No conversation chosen.
          </Text>
        </Center>
      )}
    </Flex>
  );
}
