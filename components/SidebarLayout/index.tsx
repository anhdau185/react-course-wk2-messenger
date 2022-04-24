import React, { useContext } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';

import { AccountPageContext } from 'pages/account/[accountId]';
import { MobileNav, DesktopNav } from './Navigation';
import SidebarContent from './SidebarContent';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: isMobile });
  const { currentConversation } = useContext(AccountPageContext);
  const showDesktopNav = currentConversation !== undefined;

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60, xl: 80 }}>
        {showDesktopNav && <DesktopNav display={{ base: 'none', md: 'flex' }} />}
        {children}
      </Box>
    </Box>
  );
}
