import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../utils/CustomInput";
import AuthLayout from "./AuthLayout";
import { checkEmptyFields } from "../../utils/helpers";
import { showError, showSuccess } from "../../utils/Alert";
import { useResendTokenMutation } from "../../redux/services/authApi";
// import { useFetchProfileQuery } from "../../redux/services/accountApi";
// import useAlerts from "../../hooks/useAlerts";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { handleFirebaseError } from "../../utils/Helpers";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resendTokenMutation, { isLoading: isResendTokenLoading }] =
    useResendTokenMutation();
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleInputs = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const { email } = formState;

    const isFormEmpty = checkEmptyFields({
      email,
    });

    if (!isFormEmpty) {
      resendTokenMutation({ email })
        .unwrap()
        .then(() => {
          showSuccess("A reset code has been sent to your email");
          navigate("/reset-password", { state: { email } });
        })
        .catch((err) => {
          console.log("otp err", err);
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
    <AuthLayout heading="Forgot password">
      <form onSubmit={submitForm}>
        <CustomInput
          label="Your email"
          name="email"
          type="email"
          placeholder="Enter your email and we'll send you a reset code"
          value={formState.email}
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
          isLoading={isResendTokenLoading}
          rounded="8px"
        >
          Request password reset
        </Button>
        <Button
          variant={"ghost"}
          as={Link}
          to={"/login"}
          w={"full"}
          fontWeight={500}
          _hover={{ bg: "transparent" }}
        >
          ⬅️ Back to Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
