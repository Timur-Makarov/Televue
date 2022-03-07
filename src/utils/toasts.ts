import { createToast } from "mosha-vue-toastify";

export const errorToast = (title: string, description?: string) => {
  createToast(
    {
      title,
      description,
    },
    {
      timeout: 5000,
      toastBackgroundColor: "red",
      position: "top-right",
      type: "danger",
      transition: "zoom",
      showIcon: true,
    }
  );
};
