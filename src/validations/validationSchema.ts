import * as Yup from 'yup';

const validation = Yup.object().shape({
    userName: Yup.string()
        .required("Required"),
    firstName: Yup.string()
        .required("Required"),
    lastName: Yup.string()
        .required("Required"),
    email: Yup.string()
        .email()
        .required("Required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required")
});

export default validation;