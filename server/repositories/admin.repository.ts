import mongoose from "mongoose";
import IAdmin from "../interface/admin";
import Admin from "../models/admin.model";
import IAdminBody from "../interface/bodies/studentBody";
import IAdminRepositoryInterface from "../interface/repositoryInterface/IAdminRepositoyInterface";

class AdminRepository implements IAdminRepositoryInterface {
  async authenticateUser(email: string) {
    try {
      const adminDetails = await Admin.findOne({ email: email });

      return adminDetails;
    } catch (error) {
      throw new Error(`Failed to authenticate admin: ${error}`);
    }
  }

  async adminSignUp(details: IAdminBody) {
    try {
      const adminDetails = await Admin.create(details);
      return adminDetails;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async adminChangePassword(email: string, password: string) {
    try {
      await Admin.findOneAndUpdate(
        { email: email },
        { $set: { password: password } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Failed to authenticate admin: ${error}`);
    }
  }
  async checktApproval(email: string): Promise<boolean> {
    try {
      const isAdmin = await Admin.findOne({ email: email }, { isAdmin: true });
      return isAdmin ? true : false;
    } catch (error) {
      throw new Error(`Failed to authenticate student: ${error}`);
    }
  }

  async adminIdCheck(id: string) {
    try {
      let adminExist = await Admin.findById(id);
      return adminExist;
    } catch (error) {
      throw new Error(`Failed to fetch student data : ${error}`);
    }
  }

  async adminProfileUpdeate(updateBody: IAdminBody, id: string) {
    try {
      const { username, email, password, profilePic, date_of_birth, gender } =
        updateBody;
      const updated = await Admin.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: username,
            email: email,
            password: password,
            profilePic: profilePic,
            date_of_birth: date_of_birth,
            gender: gender,
          },
        },
        { new: true }
      );
      return updated;
    } catch (error) {
      throw new Error(`Failed to update profile : ${error}`);
    }
  }
}

export default AdminRepository;
