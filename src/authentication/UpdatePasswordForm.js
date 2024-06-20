import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdatePasswordForm.css";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password, passwordConfirm }) {
    if (password !== passwordConfirm || password.length < 8) {
      return;
    }

    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
          toast.success("رمز عبور شما با موفقیت بروزرسانی شد");
        },
        onError: (error) => {
          toast.error("بروز رسانی رمز عبور با خطا مواجه شد");
        },
      }
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <span> بروزرسانی رمز عبور</span>
      <input
        placeholder="رمز عبور جدید"
        className="input"
        type="password"
        id="password"
        autoComplete="new-password"
        disabled={isUpdating}
        required
        {...register("password", {
          minLength: {
            value: 8,
            message: "رمز عبور باید بیشتر از 8 کاراکتر باشد",
          },
        })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input
        className="input"
        placeholder="تکرار رمز عبور"
        type="password"
        autoComplete="new-password"
        id="passwordConfirm"
        disabled={isUpdating}
        required
        {...register("passwordConfirm", {
          validate: (value) =>
            getValues().password === value || "رمز عبور باید یکسان باشد",
        })}
      />
      {errors.passwordConfirm && (
        <p className="error">{errors.passwordConfirm.message}</p>
      )}

      <button className="button" disabled={isUpdating}>
        بروزرسانی{" "}
      </button>
    </form>
  );
}

export default UpdatePasswordForm;
