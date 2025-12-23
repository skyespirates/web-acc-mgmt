import type { PropsWithChildren } from "react";
interface ChatBoxProps extends PropsWithChildren {
  foo?: boolean;
}

const ChatBox = ({ foo = false, children }: ChatBoxProps) => {
  return (
    <p
      className={`border align-self-${
        foo ? "end" : "start"
      } p-2 rounded shadow-sm`}
      style={{
        maxWidth: "60%",
        backgroundColor: foo ? "#99faa4" : "#ffffff",
      }}
    >
      {children}
    </p>
  );
};

export default ChatBox;
