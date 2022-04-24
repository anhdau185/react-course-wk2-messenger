import { useContext, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

import type { Conversation, Message, PaginatedResponse } from 'types/api';
import { AccountPageContext } from 'pages/account/[accountId]';
import MessageFeed from './MessageFeed';

type ChatViewProps = {
  conversation: Conversation;
};

export default function ChatView({ conversation }: ChatViewProps) {
  const { account } = useContext(AccountPageContext);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axios.get<PaginatedResponse<Message>>(
      `/api/account/${account?.id}/conversation/${conversation.id}/messages`
    )
      .then(response => setMessages(response.data.rows));
  }, [account?.id, conversation.id]);

  return (
    <>
      <MessageFeed messages={messages} />
      <Box borderTop="1px" borderColor="gray.200" p="5">
        THIS IS MESSAGE BOX
      </Box>
    </>
  );
}
