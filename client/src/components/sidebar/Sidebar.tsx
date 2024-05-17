import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import Notifications from "@mui/icons-material/Notifications";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import VideoChatSharpIcon from "@mui/icons-material/VideoChatSharp";
import SignOut from "../signOut/SignOut";

const Sidebar: React.FC = () => {
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [showUserManagementOptions, setShowUserManagementOptions] =
    useState(false);
  const userType: string =
    useSelector((state: RootState) => state.user.userType) || "student";
  const courseManagementHeading =
    userType === "admin" ? "Course Management" : "Courses";
  const userManagementHeading =
    userType === "admin" ? "User Management" : "Attendance";

  const toggleCourseOptions = () => {
    setShowCourseOptions(!showCourseOptions);
  };

  const toggleUserManagementOptions = () => {
    setShowUserManagementOptions(!showUserManagementOptions);
  };

  // Dynamically generate the profile link based on user type
  const getProfileLink = () => {
    switch (userType) {
      case "teacher":
        return "/teacherProfile";
      case "admin":
        return "/adminProfile";
      default:
        return "/profile";
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <PersonOutlineSharpIcon style={{ color: "#4d2c5e" }} />
            <Link to={getProfileLink()} className="sidebarListItemText">
              Profile
            </Link>
          </li>
          <li className="sidebarListItem">
            <ClassOutlinedIcon
              style={{ color: "#4d2c5e" }}
              onClick={toggleCourseOptions}
            />
            <span className="sidebarListItemText" onClick={toggleCourseOptions}>
              {courseManagementHeading}
            </span>
            {showCourseOptions && (
              <ul className="subMenu">
                {/* Render course management links based on user type */}
                {userType === "teacher" && (
                  <>
                    <li className="subMenuItem">
                      <Link to="/createCourseForm">Create Course</Link>
                    </li>
                    <li className="subMenuItem">
                      <Link to="/updateCourse">Update Courses</Link>
                    </li>
                  </>
                )}
                {userType === "student" && (
                  <li className="subMenuItem">
                    <Link to="/mylearnings">My Learning</Link>
                  </li>
                )}
                {userType === "admin" && (
                  <>
                    <li className="subMenuItem">
                      <Link to="/courseManagement/admin">
                        Course Management
                      </Link>
                    </li>
                    <li className="subMenuItem">
                      <Link to="/courseManagement/admin/addSubject">
                        Add Subject
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
          <li className="sidebarListItem">
            <GroupsOutlinedIcon
              style={{ color: "#4d2c5e" }}
              onClick={toggleUserManagementOptions}
            />
            <span
              className="sidebarListItemText"
              onClick={toggleUserManagementOptions}
            >
              {userManagementHeading}
            </span>
            {showUserManagementOptions && (
              <ul className="subMenu">
                {/* Render user management links based on user type */}
                {userType === "admin" && (
                  <>
                    <li className="subMenuItem">
                      <Link to="/userManagement/student">Student</Link>
                    </li>
                    <li className="subMenuItem">
                      <Link to="/userManagement/teacher">Teacher</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </li>
          <li className="sidebarListItem">
            <ModeCommentOutlinedIcon style={{ color: "#4d2c5e" }} />
            <Link to="/messanger">
              <span className="sidebarListItemText">Messager</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Notifications style={{ color: "#4d2c5e" }} />
            <span className="sidebarListItemText">Notifications</span>
          </li>
          {userType !== "admin" && (
            <li className="sidebarListItem">
              <VideoChatSharpIcon style={{ color: "#4d2c5e" }} />
              <a
                href="/videoChat"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebarListItemText"
              >
                Live Classes
              </a>
            </li>
          )}

          <li className="sidebarButton ">
            <SignOut />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
