import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import type { AxiosError } from "axios";
import { RoleSelectModal, type Role } from "../components/RoleModal";

import client from "../utils/axios";
import { useJwt } from "../hooks/useJwt";
import { login } from "../api/api";
import { useNavigate } from "react-router";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface Response {
  data: SuccessResponse;
}

export interface SuccessResponse {
  message: string;
  access_token?: string;
  roles?: Role[];
}

interface ErrorResponse {
  message: string;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useJwt();

  const navigate = useNavigate();

  const { isError, isPending, mutate, error, isSuccess, data } = useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    LoginPayload
  >({
    mutationFn: login,
    onSuccess: (data: SuccessResponse) => {
      setToken(data.access_token!);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginPayload: LoginPayload = {
      username,
      password,
    };
    mutate(loginPayload);
  };

  const handleSelect = async (employee_id: number, role_id: number) => {
    const payload = {
      employee_id,
      role_id,
    };
    try {
      const res = await client.post("/roles/select", payload);
      setToken(res.data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      throw new Error("failed to select role");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username </Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              {isPending ? (
                "Login processing"
              ) : (
                <>
                  {isError ? (
                    <>
                      <h1>error</h1>
                      <pre>cause: {JSON.stringify(error.cause)}</pre>
                      <pre>data: {JSON.stringify(error?.response?.data)}</pre>
                    </>
                  ) : null}

                  {isSuccess ? (
                    !data.roles ? (
                      navigate("/")
                    ) : (
                      <RoleSelectModal
                        show={true}
                        roles={data.roles!}
                        onSelect={handleSelect}
                        onClose={() => {}}
                      />
                    )
                  ) : null}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
