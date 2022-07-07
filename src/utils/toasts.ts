import { createToast, ToastOptions } from "mosha-vue-toastify";

const defaultToastConfig: ToastOptions = {
  timeout: 5000,
  position: "top-right",
  transition: "zoom",
  showIcon: true,
};

export const errorToast = (title: string, description?: string) => {
  createToast(
    { title, description },
    {
      ...defaultToastConfig,
      toastBackgroundColor: "red",
      type: "danger",
    }
  );
};

export const successToast = (title: string, description?: string) => {
  createToast(
    { title, description },
    {
      ...defaultToastConfig,
      toastBackgroundColor: "green",
      type: "success",
    }
  );
};
