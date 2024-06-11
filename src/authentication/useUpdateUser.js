import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../services/apiAuth";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success('رمز عبور شما با موفقیت بروزرسانی شد');
    },
  });

  return { updateUser, isUpdating };
}
