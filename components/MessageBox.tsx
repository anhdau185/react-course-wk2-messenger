import { useCallback, useState } from 'react';
import { Box, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { IoIosSend } from 'react-icons/io';
import axios, { AxiosResponse } from 'axios';

import type { FetchDataCallback, SetStateCallback } from 'types/util';
import { useAccountPageData } from 'context/accountPage';
import type { Message } from 'types/api';

type MessageBoxProps = {
  updateMessages?: SetStateCallback<Message[]>;
  refetchData?: FetchDataCallback;
};

const createMessage = ({
  accountId,
  conversationId,
  text
}: {
  accountId: string | undefined;
  conversationId: string | undefined;
  text: string;
}) => {
  type RequestBody = { text: string };
  type ResponseData = { data: Message };

  return axios.post<
    ResponseData,
    AxiosResponse<ResponseData>,
    RequestBody
  >(
    `/api/account/${accountId}/conversation/${conversationId}/messages`,
    { text }
  );
};

export default function MessageBox({ updateMessages }: MessageBoxProps) {
  const { account, currentConversation } = useAccountPageData();
  const [text, setText] = useState('');
  const clearText = () => setText('');

  const sendMessage = useCallback(() => {
    if (!text) return;

    createMessage({
      text,
      accountId: account?.id,
      conversationId: currentConversation?.id
    }).then(response => {
      updateMessages?.(prevState => [response.data.data, ...prevState]);
    });
    clearText();
  }, [text, account?.id, currentConversation?.id]);

  return (
    <Box p="4" mt="2" borderTop="1px" borderColor="gray.200">
      <InputGroup>
        <Input
          variant="filled"
          placeholder="enter your message"
          px="3"
          value={text}
          borderRadius="3xl"
          onChange={event => setText(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') sendMessage();
          }}
        />
        <IconButton
          variant="ghost"
          aria-label="send message"
          ml="2"
          color="purple.600"
          icon={<IoIosSend size={30} />}
          disabled={!text}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={sendMessage}
        />
      </InputGroup>
    </Box>
  );
}
