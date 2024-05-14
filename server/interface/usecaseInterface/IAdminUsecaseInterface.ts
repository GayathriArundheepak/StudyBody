// IAdminUsecaseInterface.ts

interface IAdminUsecaseInterface {
    blockUser(id: string, userType: string): Promise<{ success: boolean, message: string }>;
    unblockUser(id: string, userType: string): Promise<{ success: boolean, message: string }>;
    approveTeacher(id: string): Promise<{ success: boolean, message: string }>;
    disApproveTeacher(id: string): Promise<{ success: boolean, message: string }>;
    // Define other methods as needed
}

export default IAdminUsecaseInterface;
