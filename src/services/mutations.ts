import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "@/store/useAuthStore"
import { CreateUser, LoginUser } from "@/types/user";
import { SignupReturnType } from "@/types/SignupReturnTpye";
import { toast } from "sonner"
import { LoginReturnType } from "@/types/LoginReturnType";
import { useBlogStore } from "@/store/useBlogStore";
import { Blog, BlogReturnType } from "@/types/blog";

export const useSignUpUserMutation = () => {

    const { signup } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUser) => signup(data),
        onSuccess: async(data: SignupReturnType) => {
            if(data.success) {
                localStorage.setItem("startup_auth_token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: async(_, error) => {
            if(error) {
                throw new Error(`Signup Error: ${error.message}`);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["users"]
                });
            }
        }
    });
}

export const useLoginUserMutation = () => {

    const { login } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginUser) => login(data),
        onSuccess: async(data: LoginReturnType) => {
            if(data.success) {
                localStorage.setItem("startup_auth_token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: async(_, error) => {
            if(error) {
                throw new Error(`Signup Error: ${error.message}`);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["users"]
                });
            }
        }
    });
}

export const useLogoutMutation = () => {
    const { logout } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async() => {
            logout();
        },
        onSuccess: () => {
            toast.success("Logged out successfully!");
        },
        onSettled: async(_, error) => {
            if(error) {
                throw new Error(`Signup Error: ${error.message}`);
            } else {
                await queryClient.invalidateQueries({
                    queryKey: ["users"]
                });
            }
        }
    });
};


export const useCreateBlogMutation = () => {
    const queryClient = useQueryClient();
    const { createBlog } = useBlogStore();

    return useMutation({
        mutationFn: (data: Blog) => createBlog(data),
        onSuccess: async(data: BlogReturnType) => {
            if(data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: async() => {
            await queryClient.invalidateQueries({
                queryKey: ["blogs"]
            })
        }
    });
}
