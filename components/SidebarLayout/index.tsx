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
import { useAccountPageData } from 'context/accountPage';
import { MobileChatHeader, DesktopChatHeader } from './Navigation';
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
        <SidebarContent display={{ base: 'none', md: 'block' }} />
        <Drawer
          placement="left"
          isOpen={isOpen}
          autoFocus={false}
          returnFocusOnClose={false}
          onClose={onClose}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent />
          </DrawerContent>
        </Drawer>
        <Flex
          h="100%"
          ml={{ base: 0, md: 60, xl: 80 }}
          flexDir="column"
        >
          <MobileChatHeader />
          {showDesktopNav && <DesktopChatHeader />}
          {children}
        </Flex>
      </Box>
    </SidebarContext.Provider>
  );
}
