import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../axios/api";
import "./UserList.scss"; // Import the shared Sass file
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";

interface User {
  _id: string;
  username: string;
  email: string;
  otpApproved: boolean;
  mylearnings?: string;
  gender: string;
  date_of_birth?: string;
  rating?: number;
  qualifications?: string;
  block: boolean;
  adminApproved: boolean;
}

interface UserListProps {
  userType: "student" | "teacher";
}

function UserList({ userType }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const navigate = useNavigate(); // Get the history object

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await api.get(`/api/${userType}/${currentPage}/${itemsPerPage}`);
        const response = await api.get(`/api/${userType}/${userType}sList`);
        setUsers(response.data.data);
      } catch (error) {
        console.error(`Error fetching ${userType}s:`, error);
      }
    };

    fetchUsers();
  }, [userType]);
  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to first page when changing items per page
  };
  // Calculate pagination variables
  const indexOfLastUser = (currentPage + 1) * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const onBlock = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/block-user/${userType}/${id}`
      );
      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, block: true };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error blocking ${userType}:`, error);
    }
  };

  const onAdminApprove = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/approve-teacher/${id}`);
      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, adminApproved: true };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error blocking ${userType}:`, error);
    }
  };

  const onUnblock = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/unblock-user/${userType}/${id}`
      );

      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, block: false };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error unblocking ${userType}:`, error);
    }
  };

  const onDisapprovalApproval = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/disApprove-teacher/${id}`
      );
      const updatedUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, adminApproved: false };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error(`Error unblocking ${userType}:`, error);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="userList">
      <Navbar />
      <div className="user-list-container">
        <h2>{userType === "student" ? "Student List" : "Teacher List"}</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              {userType === "student" && <th>Learnings</th>}
              {userType === "teacher" && (
                <>
                  <th>Rating</th>
                  <th>Qualifications</th>
                </>
              )}
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                {userType === "student" && <td>{user.mylearnings}</td>}
                {userType === "teacher" && (
                  <>
                    <td>{user.rating}</td>
                    <td>{user.qualifications}</td>
                  </>
                )}
                <td>{user.date_of_birth}</td>
                <td>
                  {user.otpApproved && (
                    <>
                      {user.block ? (
                        <button onClick={() => onUnblock(user._id)}>
                          Unblock
                        </button>
                      ) : (
                        <>
                          {userType === "teacher" && !user.adminApproved && (
                            <button onClick={() => onAdminApprove(user._id)}>
                              Approve
                            </button>
                          )}
                          {user.adminApproved && userType === "teacher" && (
                            <button
                              onClick={() => onDisapprovalApproval(user._id)}
                            >
                              Disapprove
                            </button>
                          )}
                          <button onClick={() => onBlock(user._id)}>
                            Block
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {!user.otpApproved && <p>User is not OTP approved</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p>No {userType === "student" ? "students" : "teachers"} available</p>
        )}
        <div className="pagination-container">
          {/* Pagination controls */}
          <div className="pagination" style={{ color: "blue" }}>
            {/* Items per page selection */}
            <select
              onChange={(e) => changeItemsPerPage(Number(e.target.value))}
            >
              <option value={2}>2 per page</option>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
            </select>

            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                disabled={currentPage === pageNumber}
              >
                {pageNumber + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserList;
