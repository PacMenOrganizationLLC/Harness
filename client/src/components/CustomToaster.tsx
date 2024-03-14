import { Toaster } from "react-hot-toast"

export const CustomToaster = () => {
  return (
    <Toaster toastOptions={{
      className: "bg-dark text-white"
    }} />
  )
}
