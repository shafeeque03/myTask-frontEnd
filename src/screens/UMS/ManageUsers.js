import React, { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useSelector } from "react-redux";
import {
  getRoleApi,
  addUserApi,
  getUserApi,
  deleteUserApi,
  updateUserApi,
} from "../../api/roleAndUserApi"; // Make sure you have these API functions
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { routerLinks } = useSelector((state) => state.userReducer);
console.log(routerLinks,"kokokokok2222222")
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    getRoleApi()
      .then((res) => {
        setRoles(res?.data?.roles || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getUserApi()
      .then((res) => {
        setUsers(res?.data?.users || []);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleButtonClick = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setSelectedRoles([]);
    setEditMode(false);
    setCurrentUserId(null);
  };

  const handleCheckboxChange = (role) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(role)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role]
    );
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
        roles: selectedRoles,
      };

      if (editMode) {
        await updateUserApi(currentUserId, userData)
          .then((res) => {
            if (res.status === 200) {
              getUserApi()
                .then((res) => {
                  setUsers(res?.data?.users || []);
                })
                .catch((err) => {
                  console.log(err.message);
                });
              toast.success("User Updated");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("An error occurred");
          });
      } else {
        await addUserApi(userData)
          .then((res) => {
            if (res.status === 200) {
              getUserApi()
                .then((res) => {
                  setUsers(res?.data?.users || []);
                })
                .catch((err) => {
                  console.log(err.message);
                });
              toast.success("User Added");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("An error occurred");
          });
      }

      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditMode(true);
    setCurrentUserId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setPassword("");
    setSelectedRoles(user.roles.map((role) => role._id));
    setShowModal(true);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUserApi(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="User Management" />
      <button className="btn btn-primary" onClick={handleButtonClick}>
        Add User
      </button>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              <>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      <select className="form-select">
                        {user.roles.map((role, i) => (
                          <option key={i} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="modal show fade-ef"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Edit User" : "Add User"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={!editMode} // Password required only in add mode
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Roles</label>
                    <div className="checkbox-group">
                      {roles.map((role) => (
                        <div key={role._id} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input p-1"
                            id={`checkbox-${role._id}`}
                            checked={selectedRoles.includes(role._id)}
                            value={role._id}
                            onChange={() => handleCheckboxChange(role._id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${role._id}`}
                          >
                            {role.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    {editMode ? "Update" : "Submit"}
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
