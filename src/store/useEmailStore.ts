import { axiosInstance } from "@/lib/axios";
import { sendEmailType, useEmailStoreType } from "@/types/email";
import { create } from "zustand"

export const useEmailStore = create<useEmailStoreType>(() => ({
    sendEmail: (data: sendEmailType) => {
        return (axiosInstance.post("/contact", data));
    }
}));