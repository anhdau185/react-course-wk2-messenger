import { useMemo } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { useSidebar } from 'context/sidebar';
import { useAccountPageData } from 'context/accountPage';
import { getConversationName } from 'utils';

export default function MobileChatHeader() {
  const { openSidebar } = useSidebar();
  const { account, currentConversation } = useAccountPageData();
  const showConversationName = currentConversation !== undefined;

  const conversationName = useMemo(
    () => `You and ${getConversationName(currentConversation, account)}`,
    [account, currentConversation]
  );

  return (
    <Flex
      display={{ base: 'flex', md: 'none' }}
      p="3"
      align="center"
      justify="flex-start"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <IconButton
        variant="ghost"
        aria-label="open menu"
        mr="3"
        onClick={openSidebar}
        icon={<HamburgerIcon fontSize="xl" />}
      />
      {showConversationName
        ? <Text fontSize="lg" fontWeight="bold">{conversationName}</Text>
        : (
          <Text fontSize="md">
            Who do you feel like chatting with today?
          </Text>
        )}
    </Flex>
  );
}
