import { FC } from "react";
import toast from "react-hot-toast";

export const ConfirmationToast: FC<{
  toastId: string,
  message: string
  confirmHandler: () => void
}> = ({ toastId, message, confirmHandler }) => {
  return (
    <div>
      <div className="text-center">
        {message}
      </div>
      <hr className="m-2" />
      <div className="row w-100">
        <div className="col-6 text-end">
          <button
            className="btn btn-danger w-100"
            onClick={() => toast.dismiss(toastId)}>
            No
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-bold w-100"
            onClick={confirmHandler}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}