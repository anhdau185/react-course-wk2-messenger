import { Heading } from '@chakra-ui/react';

import { Conversation } from 'types/api';

type ChatViewProps = {
  conversation: Conversation;
};

export default function ChatView({ conversation }: ChatViewProps) {
  return (
    <Heading>Showing conversation {conversation.id}</Heading>
  );
}
