interface IAdminBody{
        profilePic?: string | null;
        username?: string;
        email: string  ;
        password?: string ;
        newPassword?: string;
        gender?: string ;
        date_of_birth?: Date;
        userType?: string;
        file?: Express.Multer.File;
      
}

export default IAdminBody;
