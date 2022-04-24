import type { Conversation, User } from 'types/api';

export function getConversationName(
  conversation?: Conversation,
  yourself?: User
): string {
  if (conversation === undefined) return '';

  if (yourself === undefined) {
    return  conversation.participants
      .map(participant => participant.name)
      .join(', ');
  }

  return conversation.participants
    .filter(participant => participant.id !== yourself.id)
    .map(participant => participant.name)
    .join(', ');
}

export function isSamePerson(
  person1: User | undefined,
  person2: User | undefined
): boolean {
  return (
    person1 !== undefined && person2 !== undefined && person1.id === person2.id
  );
}
