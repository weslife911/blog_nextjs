export type CreateUser = {
    full_name: string,
    email: string,
    password: string,
    authType?: string,
    isVerified?: boolean,
    emailVerificationToken?: string,
    profile_pic?: string,
    createdAt?: Date,
    updatedAt?: Date,
};

export type LoginUser = {
    email: string,
    password: string
};

export type AuthenticatedUser = {
    _id: string,
    full_name: string,
    email: string,
    authType?: string,
    isVerified?: boolean,
    emailVerificationToken?: string,
    profile_pic?: string,
    createdAt?: Date,
    updatedAt?: Date,
};
