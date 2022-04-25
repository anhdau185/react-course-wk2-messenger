import { useState } from 'react';
import { Box, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { IoIosSend } from 'react-icons/io';

import type { Message } from 'types/api';

type MessageBoxProps = {
  refetchMessages: () => Promise<unknown>;
  optimisticUpdateMessages?: (newMessages: Message[]) => void;
};

export default function MessageBox({ refetchMessages, optimisticUpdateMessages }: MessageBoxProps) {
  const [text, setText] = useState('');
  const clearText = () => setText('');

  const send = () => {
    if (!text) return;

    window.alert(text);
    clearText();
  };

  return (
    <Box borderTop="1px" borderColor="gray.200" p="4" mt="2">
      <InputGroup>
        <Input
          variant="filled"
          placeholder="enter your message"
          px="3"
          value={text}
          borderRadius="3xl"
          onChange={event => setText(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') send();
          }}
        />
        <IconButton
          variant="ghost"
          aria-label="send message"
          ml="2"
          color="purple.600"
          icon={<IoIosSend size={30} />}
          disabled={!text}
          onClick={send}
        />
      </InputGroup>
    </Box>
  );
}
