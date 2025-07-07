import { toast } from "sonner";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => ({
  toast: ({ title, description, variant }: ToastOptions) => {
    if (variant === "destructive") {
      toast.error(title, { description });
    } else {
      toast(title, { description });
    }
  },
});
