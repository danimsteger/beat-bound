import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.token;
      Auth.login(token);

      const storedToken = localStorage.getItem('id_token');
      
      if (!storedToken) {
        console.error("Token was not stored properly.");
      }
    },
    onError: (error) => {
      setShowAlert(true);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err) => {
          console.error("GraphQL Error:", err.message);
        });
      }
      if (error.networkError) {
        console.error("Network Error:", error.networkError);
      }
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidated(true);
      try {
        const { data } = await loginUser({
          variables: userFormData,
        });
        Auth.login(data.login.token);
        setTimeout(() => {
          const token = localStorage.getItem('id_token');
          if (token) {
            console.log("Token successfully stored and available:", token);
          } else {
            console.error("Token was not found in localStorage after login.");
          }
        }, 100); 
        
      } catch (err) {
        console.error('Error during login:', err);
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
