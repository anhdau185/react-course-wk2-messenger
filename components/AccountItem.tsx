import Link from 'next/link';
import { Avatar, Container, Heading, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import type { User } from 'types/api';

interface AccountItemProps {
  account: User;
}

const AccountItem = ({ account }: AccountItemProps) => (
  <Link href="#">
    <Container
      display="flex"
      alignItems="center"
      p="3"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      cursor="pointer"
      transition="ease-in-out"
      transitionDuration="0.2s"
      _hover={{ bg: 'purple.50' }}
      _active={{ bg: 'purple.100' }}
    >
      <Avatar bg="purple.500" />
      <Container>
        <Heading as="span" size="md" color="gray.600">{account.name}</Heading>
        <Text color="gray.500">{'email@domain.com'}</Text>
      </Container>
      <ChevronRightIcon fontSize="xl" />
    </Container>
  </Link>
);

export default AccountItem;
