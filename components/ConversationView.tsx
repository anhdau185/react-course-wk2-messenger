import { Heading } from '@chakra-ui/react';

import { Conversation } from 'types/api';

type ConversationViewProps = {
  conversation: Conversation;
};

export default function ConversationView({ conversation }: ConversationViewProps) {
  return (
    <Heading>Showing conversation {conversation.id}</Heading>
  );
}
