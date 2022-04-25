import { useCallback, useEffect, useState } from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';

import type { Message, PaginatedResponse } from 'types/api';
import { useAccountPageData } from 'context/accountPage';
import MessageFeed from './MessageFeed';
import MessageBox from './MessageBox';
import MobileChatHeader from './MobileChatHeader';
import DesktopChatHeader from './DesktopChatHeader';

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

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { account, currentConversation } = useAccountPageData();
  const anyConversationChosen = currentConversation !== undefined;

  const fetchData = useCallback(
    () => getMessages({
      accountId: account?.id,
      conversationId: currentConversation?.id
    }),
    [account?.id, currentConversation?.id]
  );

  useEffect(() => {
    if (account?.id && currentConversation?.id) {
      fetchData().then(
        response => setMessages(response.data.rows)
      );
    }
  }, [account?.id, currentConversation?.id]);

  return (
    <Flex flexDir="column" w="100%" h="100%">
      <MobileChatHeader />
      <DesktopChatHeader />
      {anyConversationChosen ? (
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
