import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { useProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);
console.log(userInfo);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [updateProfile, { isLoadingn: loadingUpdateProfile, error }] =
    useProfileMutation();

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Label>User Name</Form.Label>
          <Form.Group controlId="name" className="my-2">
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Group controlId="email" className="my-2">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Group controlId="password" className="my-2">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Group controlId="confirmpassword" className="my-2">
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Column</Col>
    </Row>
  );
};

export default ProfileScreen;
