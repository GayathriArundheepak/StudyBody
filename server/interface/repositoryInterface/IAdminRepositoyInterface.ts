import IAdminBody from "../bodies/adminBody";
import IAdmin from "../admin";

interface IAdminRepositoryInterface {
  authenticateUser(email: string): Promise<IAdmin | null>;
  adminSignUp(details: IAdminBody): Promise<IAdmin>;
  adminChangePassword(email: string, password: string): Promise<void>;
  checktApproval(email: string): Promise<boolean>;
  adminIdCheck(id: string): Promise<IAdmin | null>;
  adminProfileUpdeate(
    updateBody: IAdminBody,
    id: string
  ): Promise<IAdmin | null>;
  // adminProfilePicUpload(filePath: string, id: string): Promise<IAdmin | null>;
}

export default IAdminRepositoryInterface;
