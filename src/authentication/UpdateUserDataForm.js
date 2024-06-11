import { useState } from "react";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateUserDataForm.css";

function UpdateUserDataForm() {
  const user = useUser();
  const email = user?.user?.email;

  const { updateUser, isUpdating } = useUpdateUser();

  const [avatar, setAvatar] = useState(null);
  const [fileName, setFileName] = useState("آپلود عکس");
  const [isUploaded, setIsUploaded] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(
      { avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          setFileName("آپلود عکس");
          e.target.reset();
          setIsUploaded(false);
        },
      }
    );
  }


  return (
    <form className="UpdateUserDataForm" onSubmit={handleSubmit}>
      {email && (
        <input className="UpdateUserDataForm-input" value={email} disabled />
      )}

      <input
        className="UpdateUserDataForm-input"
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setAvatar(e.target.files[0]);
          setFileName(e.target.files[0].name);
          setIsUploaded(true);
        }}
        disabled={isUpdating || isUploaded}
      />
      <label htmlFor="avatar">{fileName}</label>
      <button
        className="UpdateUserDataForm-button"
        disabled={isUpdating || !isUploaded}
      >
        بروزرسانی
      </button>
    </form>
  );
}

export default UpdateUserDataForm;
