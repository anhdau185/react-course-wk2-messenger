import React, { useMemo } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import type { FlexProps } from '@chakra-ui/react';
import {
  IconButton,
  CloseButton,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { useAccountPageContext } from 'pages/account/[accountId]';
import { getConversationName } from 'utils';

type MobileNavProps = FlexProps & {
  onOpen: () => void;
};

export const MobileNav = ({ onOpen, ...rest }: MobileNavProps) => {
  const { account, currentConversation } = useAccountPageContext();
  const showConversationName = currentConversation !== undefined;
  const conversationName = useMemo(
    () => `You and ${getConversationName(currentConversation, account)}`,
    [account, currentConversation]
  );

  return (
    <Flex
      p="3"
      align="center"
      justify="flex-start"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      {...rest}
    >
      <IconButton
        variant="ghost"
        aria-label="open menu"
        mr="3"
        onClick={onOpen}
        icon={<HamburgerIcon fontSize="xl" />}
      />
      <Text fontSize="lg" fontWeight="bold">
        {showConversationName && conversationName}
      </Text>
    </Flex>
  );
};

export const DesktopNav = (flexProps: FlexProps) => {
  const { account, currentConversation, setCurrentConversation } =
    useAccountPageContext();

  const conversationName = useMemo(
    () => getConversationName(currentConversation, account),
    [account, currentConversation]
  );

  return (
    <Flex
      px="6"
      py="4"
      align="center"
      justify="space-between"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      {...flexProps}
    >
      <Text fontSize="lg" fontWeight="bold">You and {conversationName}</Text>
      <CloseButton onClick={() => setCurrentConversation?.(undefined)} />
    </Flex>
  );
};
