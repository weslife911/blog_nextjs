

export type sendEmailType = {
    full_name: string,
    email: string,
    message: string
}

export type sendEmailReturnType = {
    success: boolean,
    message: string
}

export type useEmailStoreType = {
    sendEmail: (data: sendEmailType) => Promise<sendEmailReturnType>
}