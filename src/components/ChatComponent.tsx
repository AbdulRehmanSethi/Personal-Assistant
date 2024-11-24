import React from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const Chat: React.FC<{
  messages: IMessage[];
  onSend: (newMessages: IMessage[]) => void;
}> = ({ messages, onSend }) => (
  <GiftedChat
    messages={messages}
    onSend={onSend}
    user={{ _id: 1, name: "User" }}
    alwaysShowSend
  />
);

export default Chat;
