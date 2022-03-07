export const createGroupImage = "https://minfin.com.ua/files/image/unnamed(37).png";
export const joinToGroupImage =
  "https://cdn.substack.com/image/fetch/h_600,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fmedia%2FE-EIV8ZUYAIOg5a.jpg";

export const generateGroupImage = (title: string) =>
  `https://avatars.dicebear.com/api/initials/${title.replace("?", "")}.svg`;
