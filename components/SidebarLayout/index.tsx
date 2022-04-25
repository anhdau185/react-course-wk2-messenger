import { ReactNode, useEffect, useMemo } from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react';

import { SidebarContextValues, SidebarContext } from 'context/sidebar';
import SidebarContent from './SidebarContent';

export default function SidebarLayout({ children: chatView }: { children: ReactNode }) {
  const [isMobile] = useMediaQuery('(max-width: 767px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Box h="100%" ml={{ base: 0, md: 60, xl: 80 }}>
          {chatView}
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
}
