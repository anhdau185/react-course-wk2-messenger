import Link from 'next/link';
import { Avatar, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import type { User } from 'types/api';

type AccountItemProps = {
  account: User;
};

const AccountItem = ({ account }: AccountItemProps) => (
  <Link href={`/account/${account.id}`} passHref>
    <Flex
      align="center"
      p="3"
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      cursor="pointer"
      transition="ease-in-out"
      transitionDuration="0.2s"
      _hover={{ bg: 'purple.50' }}
      _active={{ bg: 'purple.100' }}
    >
      <Avatar bg="purple.500" />
      <Container>
        <Heading as="span" color="gray.800" fontSize={{ base: 'md', md: 'lg', xl: 'xl' }}>
          {account.name}
        </Heading>
        <Text color="gray.500" fontSize="sm">{'email@domain.com'}</Text>
      </Container>
      <ChevronRightIcon fontSize="xl" />
    </Flex>
  </Link>
);

export default AccountItem;
