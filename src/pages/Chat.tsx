import { useState, type FormEvent, useEffect } from "react";
import { Form, Row, Col, ListGroup } from "react-bootstrap";
import { socket } from "../socket";
import ChatBox from "../components/ChatBox";
import { useJwt } from "../hooks/useJwt";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/api";

type Message = {
  id: number;
  message: string;
};

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useJwt();
  const { isError, error, isPending, isSuccess, data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  // send message
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (text.trim()) {
      const m: Message = {
        id: user.employee_id,
        message: text,
      };
      setMessages((prev) => [...prev, m]);
      socket.emit("message", m);
      setText("");
    }
  }

  // receive message
  useEffect(() => {
    function handleMessage(msg: Message) {
      setMessages((prev) => [...prev, msg]);
    }
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    socket.connect();
    console.log(user);
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleClick(u: any) {
    alert(`user info: ${u.id} - ${u.display_name}  🚀`);
  }

  return (
    <Row className="min-vh-100 overflow-hidden">
      <Col sm={4} className="border ps-4 pt-3">
        {isError && <p>{error.message}</p>}
        {isPending && <p>Data is loading...</p>}
        {isSuccess && (
          <ListGroup>
            {data.users.map((u: any) => (
              <ListGroup.Item action onClick={() => handleClick(u)} key={u.id}>
                {u.display_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col
        sm={8}
        className="d-flex flex-column border
      gap-3 p-3 rounded shadow-sm"
        style={{
          backgroundColor: "#ececec",
        }}
      >
        <div className="top flex-grow-1 overflow-scroll overflow-x-hidden overflow-y-">
          <div className="d-flex flex-column">
            {messages.map((msg, i) => (
              <ChatBox key={i} foo={msg.id == user.employee_id}>
                {msg.message}
              </ChatBox>
            ))}
          </div>
        </div>
        <div className="bottom h-20">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="hello world 🥴"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
