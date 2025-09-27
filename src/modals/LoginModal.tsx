import LoginForm from "@/components/Auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react";

export default function LoginModal({ children }: {
    children: ReactNode
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {children}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Login
                    </DialogTitle>
                    <DialogDescription>
                        You must be authenticated to continue
                    </DialogDescription>
                </DialogHeader>
                <LoginForm/>
            </DialogContent>
        </Dialog>
    );
}
