import type { GetStaticProps, NextPage } from 'next';
import { Center, Heading, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';

import type { User } from 'types/api';
import AccountItem from 'components/AccountItem';

type HomeProps = {
  accounts: User[];
};

const Home: NextPage<HomeProps> = ({ accounts }) => (
  <Center flexDir="column" w="100vw" h="90vh">
    <Heading as="h2" fontSize={{ base: '2xl', lg: '3xl' }} mb="5" color="gray.800">
      Select an Account
    </Heading>
    <List w={{ base: '80%', lg: '50%', xl: '30%' }}>
      {accounts.map(account => (
        <ListItem key={account.id} mb="3">
          <AccountItem account={account} />
        </ListItem>
      ))}
    </List>
  </Center>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data: accounts } = await axios.get<User[]>(
    'https://messenger-api.tung.ninja/api/accounts'
  );

  return {
    props: { accounts }
  };
};

export default Home;
