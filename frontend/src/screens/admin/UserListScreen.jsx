import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import { Button, Table } from "react-bootstrap";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { useGetUsersQuery } from "../../slices/userApiSlice";

const UserListScreen = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();

  const deleteHandler = (id) => {
    console.log('delete')
  }
  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <Table strip bordered hover responsive claasName="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>PAID</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
               
                <td>
                  {user.isAdmin? (
                    <FaCheck style={{color: 'green'}}/>
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit/>
                    </Button>
                  </LinkContainer>
                <Button variant="danger" className="btn-sm">
                    <FaTrash style={{color:'white'}}/>
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
