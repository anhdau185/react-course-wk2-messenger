import React, { useMemo } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  CloseButton,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { useSidebar } from 'context/sidebar';
import { useAccountPageData } from 'pages/account/[accountId]';
import { getConversationName } from 'utils';

export const MobileChatHeader = () => {
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
      <Text fontSize="lg" fontWeight="bold">
        {showConversationName && conversationName}
      </Text>
    </Flex>
  );
};

export const DesktopChatHeader = () => {
  const { account, currentConversation, setCurrentConversation } =
    useAccountPageData();

  const conversationName = useMemo(
    () => getConversationName(currentConversation, account),
    [account, currentConversation]
  );

  return (
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
      <CloseButton onClick={() => setCurrentConversation?.(undefined)} />
    </Flex>
  );
};
