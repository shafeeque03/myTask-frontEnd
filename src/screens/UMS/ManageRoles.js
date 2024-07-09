import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import menu from "../../components/Data/menu.json";
import { addRoleApi, getRoleApi, deleteRoleApi, editRoleApi } from "../../api/roleAndUserApi";
import { toast } from "react-toastify";

const ManageRoles = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPemissions, setSelectedPemissions] = useState([]);
  const [permissions, setPermissions] = useState([...menu?.menu]);
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    getRoleApi()
      .then((res) => {
        setRoles(res?.data?.roles);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleButtonClick = () => {
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditButtonClick = (selectedRole) => {
    setIsEditMode(true);
    setSelectedRoleId(selectedRole._id);
    setName(selectedRole.name);
    setSelectedPemissions(selectedRole.permission);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setName("");
    setSelectedPemissions([]);
    setSelectedRoleId(null);
  };

  const handleCheckboxChange = (role) => {
    setSelectedPemissions((prevSelectedRoles) =>
      prevSelectedRoles.includes(role)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role]
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  async function SubmitAddRole(e) {
    e.preventDefault();
    try {
      if (name.trim() === "" || selectedPemissions.length === 0) {
        toast.error("Please fill the form");
      } else {
        const res = await addRoleApi(selectedPemissions, name.trim());
        if (res.status === 200) {
          getRoleApi()
            .then((res) => {
              setRoles(res?.data?.roles);
            })
            .catch((err) => {
              console.log(err.message);
            });
          setSelectedPemissions([]);
          setName("");
          toast.success(res?.data?.message || "New Role successfully added");
          setShowModal(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }

  async function SubmitEditRole(e) {
    e.preventDefault();
    try {
      if (name.trim() === "" || selectedPemissions.length === 0) {
        toast.error("Please fill the form");
      } else {
        const res = await editRoleApi(selectedRoleId,selectedPemissions, name.trim());
        if (res.status === 200) {
          getRoleApi()
            .then((res) => {
              setRoles(res?.data?.roles);
            })
            .catch((err) => {
              console.log(err.message);
            });
          setSelectedPemissions([]);
          setName("");
          setSelectedRoleId(null);
          toast.success(res?.data?.message || "Role successfully updated");
          setShowModal(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }

  const handleFormSubmit = (e) => {
    if (isEditMode) {
      SubmitEditRole(e);
    } else {
      SubmitAddRole(e);
    }
  };

  let deleteRole = async (roleId) => {
    try {
      await deleteRoleApi(roleId);
      setRoles(roles.filter((role) => role._id !== roleId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Role Management" />
      <button className="btn btn-primary" onClick={handleButtonClick}>
        Add Role
      </button>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Permissions</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              <>
                {roles.map((role, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{role.name}</td>
                    <td>
                      <select className="form-select">
                        {role?.permission?.map((permission, i) => (
                          <option key={i} value={permission}>
                            {permission}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning scale-button"
                        onClick={() => handleEditButtonClick(role)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger scale-button"
                        onClick={() => deleteRole(role._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <h4>Not available</h4>
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
                  {isEditMode ? "Edit Role" : "Add Role"}
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
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Permissions
                    </label>
                    <div className="dropdown">
                      <input
                        type="button"
                        className="form-control dropdown-toggle"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        value="Select Permissions"
                      />
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {permissions.map((per) => (
                          <li key={per.identifier}>
                            <div className="form-check p-1">
                              <input
                                className="form-check-input ms-1 p-2"
                                type="checkbox"
                                value={per.name}
                                id={`checkbox-${per.identifier}`}
                                onChange={() =>
                                  handleCheckboxChange(per.name)
                                }
                                checked={selectedPemissions.includes(
                                  per.name
                                )}
                              />
                              <label
                                className="form-check-label ms-1"
                                htmlFor={`checkbox-${per.name}`}
                              >
                                {per.name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    {isEditMode ? "Update" : "Submit"}
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

export default ManageRoles;
