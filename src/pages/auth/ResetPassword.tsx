import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../utils/CustomInput";
import AuthLayout from "./AuthLayout";
import { checkEmptyFields } from "../../utils/helpers";
import { showError, showSuccess } from "../../utils/Alert";
import { useResetPasswordMutation } from "../../redux/services/authApi";
// import { useFetchProfileQuery } from "../../redux/services/accountApi";
// import useAlerts from "../../hooks/useAlerts";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { handleFirebaseError } from "../../utils/Helpers";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailToVerify = location.state?.email;
  const [resetMutation, { isLoading: isResetLoading }] =
    useResetPasswordMutation();
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
    code: "",
  });

  const handleInputs = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    if (!emailToVerify) {
      navigate("/forgot-password");
    }
  }, [emailToVerify, navigate]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    const { password, confirmPassword, code } = formState;

    const isFormEmpty = checkEmptyFields({
      password,
      confirmPassword,
      code,
    });

    if (!isFormEmpty) {
      // pwd validation
      if (password.length < 6) {
        showError("Password should be at least 6 characters");
        return;
      }

      if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      resetMutation({ password, code, email: emailToVerify })
        .unwrap()
        .then((resp) => {
          console.log(resp);
          showSuccess("Password reset successful");
          navigate("/login");
        })
        .catch((err) => {
          console.log("reset err", err);
          showError(
            err?.message ||
              err?.data?.message ||
              err?.data?.error?.message ||
              "An error occurred, try again later"
          );
        });
    }
  };

  return (
    <AuthLayout heading="Reset password">
      <form onSubmit={submitForm}>
        <CustomInput
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleInputs}
          mb="13px"
        />
        <CustomInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleInputs}
          mb="13px"
        />
        <CustomInput
          label={"Code"}
          name="code"
          type="text"
          placeholder={`Enter code sent to ${emailToVerify || ""}`}
          value={formState.code}
          onChange={handleInputs}
          mb="13px"
        />
        <Button
          type="submit"
          colorScheme={"buttonPrimary"}
          mt={"29px"}
          w={"full"}
          height={"48px"}
          fontWeight={500}
          isLoading={isResetLoading}
          rounded="8px"
        >
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
