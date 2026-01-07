import { useLoginMutation, useRegisterMutation } from "@/features/auth/authApi";
import {
  adminRouteLinks,
  errorNotify,
  loginValidation,
  registerSchema,
  successNotify,
  userRouteLinks,
  validateZodSchema,
} from "@/services";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { auth } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email: email,
      password: password,
    };

    const { error } = loginValidation(data);
    if (error) return errorNotify(error);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    login(formData)
      .unwrap()
      .then((res) => {
        if (res?.data?.token) {
          navigate(adminRouteLinks.dashboard.path, { replace: true });
        }
      })
      .catch((error) => {
        errorNotify(error?.data?.message);
      });
  };

  return {
    handleSubmit,
    isLoading,
  };
};

export const useRegister = () => {
  const { auth } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    const validatedData = validateZodSchema({
      schema: registerSchema,
      data: formData,
      onError: errorNotify,
    });

    if (!validatedData) return;

    const { confirmPassword, ...apiData } = validatedData;

    const requestData = new FormData();
    requestData.append("data", JSON.stringify(apiData));

    register(requestData)
      .unwrap()
      .then((res) => {
        if (res?.success && res?.statusCode === 201) {
          successNotify(
            res?.message || "Registration successful! Please login."
          );
          navigate(userRouteLinks.home.path);
        } else {
          errorNotify(res?.message || "Registration failed");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        errorNotify(error?.data?.message || "Registration failed");
      });
  };

  useEffect(() => {
    if (auth?.token) {
      navigate(userRouteLinks.home.path);
    }
  }, [auth?.token, navigate]);

  return {
    handleSubmit,
    isLoading,
  };
};
