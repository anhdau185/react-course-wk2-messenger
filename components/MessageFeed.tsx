import { useMemo } from 'react';
import { Avatar, Box, Center, Flex, Text } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';

import type { Message } from 'types/api';
import { useAccountPageData } from 'context/accountPage';
import { isSamePerson } from 'utils';

type MessageItemProps = {
  message: Message;
};

type MessageFeedProps = {
  messages: Message[];
};

const MessageItem = ({ message }: MessageItemProps) => {
  const { account } = useAccountPageData();
  const isMyself = useMemo(
    () => isSamePerson(message.sender, account),
    [message.sender, account]
  );

  return (
    <Flex
      key={message.id}
      px={{ base: '2', md: '4' }}
      py="2"
      align="center"
      justify={isMyself ? 'flex-end' : 'flex-start'}
    >
      {!isMyself && <Avatar mr="2" />}
      <Box
        as="span"
        color={isMyself ? 'white' : undefined}
        bg={isMyself ? 'purple.500' : 'gray.200'}
        borderRadius="20px"
        p="5px 15px"
        maxW="75%"
      >
        {!isMyself ? `${message.sender.name}: ` : ''}{message.text}
      </Box>
    </Flex>
  );
};

export default function MessageFeed({ messages }: MessageFeedProps) {
  const emptyMessages = messages.length === 0;

  return !emptyMessages ? (
    <Flex
      flexGrow={1}
      flexDir="column"
      justify="flex-end"
      overflowY="hidden"
    >
      <ScrollableFeed>
        <Flex flexDir="column-reverse">
          {messages.map(message => <MessageItem message={message} />)}
        </Flex>
      </ScrollableFeed>
    </Flex>
  ) : (
    <Center flexGrow={1}>
      <Text fontSize="lg" color="gray.600">
        No messages in the conversation.
      </Text>
    </Center>
  );
}
