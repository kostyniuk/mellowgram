export const sortChatsByLatestMessage = (a, b) => {
  const compare = a.latestMessage?.send_at < b.latestMessage?.send_at ? 1 : -1;
  return compare;
};

export const sortChats = (chats, sortFunction) => {
  const emptyChats = chats.filter((element) => !element.latestMessage);
  const notEmpty = chats.filter((element) => element.latestMessage);
  notEmpty.sort(sortFunction);
  return [...notEmpty, ...emptyChats];
};
