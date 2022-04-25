import { createContext, useContext } from 'react';
import noop from 'lodash/fp/noop';

import type { Conversation, User } from 'types/api';

export interface AccountPageContextValues {
  account: User | undefined;
  conversations: Conversation[];
  currentConversation: Conversation | undefined;
  setCurrentConversation: (conversation: Conversation | undefined) => void;
}

export const AccountPageContext = createContext<AccountPageContextValues>({
  account: undefined,
  conversations: [],
  currentConversation: undefined,
  setCurrentConversation: noop
});

export const useAccountPageData = () => useContext(AccountPageContext);
