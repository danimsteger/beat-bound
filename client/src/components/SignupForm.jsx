import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER, {
    onError: (error) => {
      console.log("this is an error");
      console.error("GraphQL Error:", error);
      console.error(
        "GraphQL Error Details:",
        error.message,
        error.graphQLErrors,
        error.networkError
      );
      setShowAlert(true);
    },
    onCompleted: (data) => {
      if (data && data.addUser) {
        Auth.login(data.addUser.token);
      } else {
        console.error("No addUser data received");
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
    if (!form.checkValidity()) {
      event.stopPropagation();
      setShowAlert(true);
      return;
    }

    const trimmedFormData = {
      firstName: userFormData.firstName.trim(),
      lastName: userFormData.lastName.trim(),
      email: userFormData.email.trim(),
      password: userFormData.password.trim(),
    };
    console.log("Submitting form with data:", trimmedFormData);

    if (form.checkValidity()) {
      try {
        await addUser({
          variables: trimmedFormData,
        });
      } catch (err) {
        // Errors are handled by onError in useMutation
      }

      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
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
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your first name"
            name="firstName"
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
          />
          <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your last name"
            name="lastName"
            onChange={handleInputChange}
            value={userFormData.lastName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Last Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
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
          disabled={
            !(
              userFormData.firstName &&
              userFormData.lastName &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;

// import { useState } from "react";
// import { Form, Button, Alert, Input } from "antd";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

// const SignupForm = () => {
//   const [userFormData, setUserFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [showAlert, setShowAlert] = useState(false);

//   const [addUser] = useMutation(ADD_USER, {
//     onError: (error) => {
//       console.log("this is an error");
//       console.error("GraphQL Error:", error);
//       console.error(
//         "GraphQL Error Details:",
//         error.message,
//         error.graphQLErrors,
//         error.networkError
//       );
//       setShowAlert(true);
//     },
//     onCompleted: (data) => {
//       if (data && data.addUser) {
//         Auth.login(data.addUser.token);
//       } else {
//         console.error("No addUser data received");
//       }
//     },
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async () => {
//     try {
//       const trimmedFormData = {
//         firstName: userFormData.firstName.trim(),
//         lastName: userFormData.lastName.trim(),
//         email: userFormData.email.trim(),
//         password: userFormData.password.trim(),
//       };
//       console.log("Submitting form with data:", trimmedFormData);

//       await addUser({
//         variables: trimmedFormData,
//       });

//       setUserFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//       });
//     } catch (err) {
//       // Errors are handled by onError in useMutation
//     }
//   };

//   return (
//     <>
//       <Form
//         layout="vertical"
//         onFinish={handleFormSubmit}
//         validateTrigger="onSubmit"
//       >
//         <Alert
//           closable
//           onClose={() => setShowAlert(false)}
//           showIcon
//           type="error"
//           message="Something went wrong with your signup!"
//           show={showAlert}
//         />

//         <Form.Item
//           label="First Name"
//           name="firstName"
//           rules={[{ required: true, message: "First Name is required!" }]}
//         >
//           <Input
//             type="text"
//             placeholder="Your first name"
//             name="firstName"
//             onChange={handleInputChange}
//             value={userFormData.firstName}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Last Name"
//           name="lastName"
//           rules={[{ required: true, message: "Last Name is required!" }]}
//         >
//           <Input
//             type="text"
//             placeholder="Your last name"
//             name="lastName"
//             onChange={handleInputChange}
//             value={userFormData.lastName}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[{ required: true, message: "Email is required!" }]}
//         >
//           <Input
//             type="email"
//             placeholder="Your email address"
//             name="email"
//             onChange={handleInputChange}
//             value={userFormData.email}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: "Password is required!" }]}
//         >
//           <Input
//             type="password"
//             placeholder="Your password"
//             name="password"
//             onChange={handleInputChange}
//             value={userFormData.password}
//           />
//         </Form.Item>

//         <Button
//           disabled={
//             !(
//               userFormData.firstName &&
//               userFormData.lastName &&
//               userFormData.email &&
//               userFormData.password
//             )
//           }
//           type="primary"
//           htmlType="submit"
//         >
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default SignupForm;
