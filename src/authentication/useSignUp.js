import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("حساب با موفقیت ایجاد شد");
      navigate("/dashboard");
    },
    onError: (err) => {
      if (err.message === "User already registered") {
        toast.error("کاربر قبلا ثبت نام کرده است");
      }
    },
  });

  return { signup, isLoading };
}
