import type { PropsWithChildren } from 'react';
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

import { useSidebar } from 'context/sidebar';
import { useAccountPageData } from 'context/accountPage';
import { getConversationName } from 'utils';

type SidebarItemProps = FlexProps & PropsWithChildren<{
  selected?: boolean;
}>;

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

export default function SidebarContent(boxProps: BoxProps) {
  const { closeSidebar } = useSidebar();
  const {
    account,
    conversations,
    currentConversation,
    setCurrentConversation
  } = useAccountPageData();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60, xl: 80 }}
      pos="fixed"
      h="full"
      {...boxProps}
    >
      <Flex h="20" ml="4" mr="8" align="center" justify="space-between">
        <Flex align="center">
          <Link href="/">
            <IconButton
              variant="ghost"
              mr="3"
              aria-label="back to home"
              icon={<ChevronLeftIcon fontSize="3xl" />}
              _focus={{ outline: 'none', boxShadow: 'none' }}
            />
          </Link>
          <Text fontSize={{ base: 'xl', xl: '2xl' }} fontWeight="bold">
            Conversations
          </Text>
        </Flex>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={closeSidebar}
        />
      </Flex>
      {conversations.map(conversation => (
        <SidebarItem
          key={conversation.id}
          selected={conversation.id === currentConversation?.id}
          onClick={() => {
            setCurrentConversation?.(conversation);
            closeSidebar();
          }}
        >
          {getConversationName(conversation, account)}
        </SidebarItem>
      ))}
    </Box>
  );
}
