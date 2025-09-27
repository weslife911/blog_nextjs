export type CreateUser = {
    full_name: string,
    email: string,
    password: string,
    authType?: string,
    isVerified?: boolean,
    emailVerificationToken?: string,
    profile_pic?: string // Changed to string to allow URL
};

export type LoginUser = {
    email: string,
    password: string
};
