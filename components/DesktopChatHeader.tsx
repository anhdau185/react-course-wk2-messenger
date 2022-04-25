import { useMemo } from 'react';
import {
  CloseButton,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { useAccountPageData } from 'context/accountPage';
import { getConversationName } from 'utils';

export default function DesktopChatHeader() {
  const { account, currentConversation, setCurrentConversation } =
    useAccountPageData();

  const conversationChosen = currentConversation !== undefined;
  const conversationName = useMemo(
    () => getConversationName(currentConversation, account),
    [account, currentConversation]
  );

  return conversationChosen ? (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      px="6"
      py="4"
      align="center"
      justify="space-between"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Text fontSize="lg" fontWeight="bold">You and {conversationName}</Text>
      <CloseButton
        size="lg"
        _focus={{ outline: 'none', boxShadow: 'none' }}
        onClick={() => setCurrentConversation?.(undefined)}
      />
    </Flex>
  ) : null;
}
