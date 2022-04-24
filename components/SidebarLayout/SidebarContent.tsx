import React, { useContext } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import type { BoxProps, FlexProps } from '@chakra-ui/react';
import {
  IconButton,
  CloseButton,
  Box,
  Flex,
  Text,
  Avatar,
  Container,
  useColorModeValue
} from '@chakra-ui/react';

import { AccountPageContext } from 'pages/account/[accountId]';
import { getConversationName } from './utils';

type SidebarItemProps = FlexProps & React.PropsWithChildren<{
  selected?: boolean;
}>;

type SidebarContentProps = BoxProps & {
  onClose: () => void;
};

const SidebarItem = ({ children, selected = false, ...rest }: SidebarItemProps) => (
  <Flex
    align="center"
    p="3"
    mx="4"
    borderRadius="lg"
    role="group"
    cursor="pointer"
    bg={selected ? 'purple.100' : undefined}
    _hover={!selected ? { bg: 'purple.50' } : undefined}
    _active={!selected ? { bg: 'purple.100' } : undefined}
    {...rest}
  >
    <Avatar />
    <Container>{children}</Container>
  </Flex>
);

export default function SidebarContent({ onClose, ...rest }: SidebarContentProps) {
  const {
    account,
    conversations,
    currentConversation,
    setCurrentConversation
  } = useContext(AccountPageContext);

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60, xl: 80 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" ml="4" mr="8" align="center" justify="space-between">
        <Flex align="center">
          <Link href="/">
            <IconButton
              variant="ghost"
              mr="3"
              aria-label="back to home"
              icon={<ChevronLeftIcon fontSize="3xl" />}
            />
          </Link>
          <Text fontSize={{ base: 'xl', xl: '2xl' }} fontWeight="bold">
            Conversations
          </Text>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {conversations.map(conversation => (
        <SidebarItem
          key={conversation.id}
          selected={conversation.id === currentConversation?.id}
          onClick={() => {
            setCurrentConversation?.(conversation);
            onClose();
          }}
        >
          {getConversationName(conversation, account)}
        </SidebarItem>
      ))}
    </Box>
  );
}
