import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import { Button, Table } from "react-bootstrap";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading:loadingGetusers, refetch, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('Deleted')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {loadingGetusers ? (
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
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(user._id)}>
                    <FaTrash style={{ color: "white" }} />
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
