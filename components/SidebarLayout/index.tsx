import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';

import { SidebarContextValues, SidebarContext } from 'context/sidebar';
import { useAccountPageData } from 'pages/account/[accountId]';
import { MobileNav, DesktopNav } from './Navigation';
import SidebarContent from './SidebarContent';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentConversation } = useAccountPageData();
  const showDesktopNav = currentConversation !== undefined;

  const contextValues = useMemo<SidebarContextValues>(
    () => ({
      isSidebarOpen: isOpen,
      openSidebar: onOpen,
      closeSidebar: onClose
    }),
    [isOpen]
  );

  useEffect(() => {
    if (isMobile) onOpen();
  }, []);

  return (
    <SidebarContext.Provider value={contextValues}>
      <Box h="100vh" bg={useColorModeValue('white', 'gray.900')}>
        <SidebarContent
          display={{ base: 'none', md: 'block' }}
          onClose={() => onClose}
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
        <Flex
          h="100%"
          ml={{ base: 0, md: 60, xl: 80 }}
          flexDir="column"
        >
          <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
          {showDesktopNav && <DesktopNav display={{ base: 'none', md: 'flex' }} />}
          {children}
        </Flex>
      </Box>
    </SidebarContext.Provider>
  );
}
