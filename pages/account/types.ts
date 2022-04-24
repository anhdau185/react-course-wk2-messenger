
import type { Conversation, User } from 'types/api';

export type AccountPageParams = {
  accountId: string;
};

export type AccountPageProps = {
  account: User;
};

export interface AccountPageContextValues {
  account?: User;
  conversations: Conversation[];
  currentConversation?: Conversation;
  setCurrentConversation?: (conversation: Conversation | undefined) => void;
}
