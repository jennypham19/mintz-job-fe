import { object, ref, string } from 'yup';

export const usernameValidateSchema = string().required('Email là bắt buộc');

const passwordValidateSchema = string()
  .required('Password is required')
  // .min(8, 'Password must be at least 8 characters')
  // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  // .matches(/\d/, 'Password must contain at least one number');

const confirmPasswordValidateSchema = (label: string) =>
  string()
    .oneOf([ref(label)], "Mật khẩu và Nhập lại mật khẩu không trùng nhau")
    .required('Nhập lại mật khẩu là bắt buộc');

const passwordSchema = <T extends string>(label: T) =>
  object().shape({
    password: passwordValidateSchema,
    confirmPassword: confirmPasswordValidateSchema(label),
  });

export const loginSchema = object().shape({
  username: usernameValidateSchema,
  password: string().required('Mật khẩu là bắt buộc'),
});

export const registrationSchema = object()
  .shape({
    email: usernameValidateSchema,
    fullName: string().required('Họ tên là bắt buộc')
  })
  .concat(passwordSchema('password'));

export const resetPasswordValidationSchema = object()
  .shape({
    oldPassword: passwordValidateSchema,
  })
  .concat(passwordSchema('password'));

export const changePasswordSchema = passwordSchema('password');
