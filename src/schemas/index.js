import * as yup from "yup";

// Schemas for forms validation

export const recipeSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title must be at least 5 characters long")
    .required("Title is required"),

  publisher: yup
    .string()
    .min(5, "Publisher name must be at least 5 characters long")
    .required("Publisher is required"),
  prep: yup
    .number()
    .positive("Value must be a positive number")
    .min(1, "Preparation time must me at least 1 min"),
  servings: yup
    .number()
    .positive("Value must be a positive number")
    .integer("Value must be integer")
    .min(1, "Number of servings must be at least 1"),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Enter a valid Email").required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 7 characters long")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
