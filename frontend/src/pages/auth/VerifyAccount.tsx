import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../utils/CustomInput";
import AuthLayout from "./AuthLayout";
import { checkEmptyFields } from "../../utils/helpers";
import { showError, showSuccess } from "../../utils/Alert";
import {
  useResendTokenMutation,
  useVerifyAccountMutation,
} from "../../redux/services/authApi";
// import { useFetchProfileQuery } from "../../redux/services/accountApi";
// import useAlerts from "../../hooks/useAlerts";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { handleFirebaseError } from "../../utils/Helpers";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailToVerify = location.state?.email;
  const [codeResent, setCodeResent] = useState(false);
  const [resendTokenMutation, { isLoading: isResendTokenLoading }] =
    useResendTokenMutation();
  const [verifyEmailMutation, { isLoading: isVerifyEmailLoading }] =
    useVerifyAccountMutation();
  const [formState, setFormState] = useState({
    code: "",
  });

  const handleInputs = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    if (emailToVerify) {
      resendTokenMutation({ email: emailToVerify })
        .unwrap()
        .then(() => {
          console.log("Token sent");
        })
        .catch((err) => {
          console.log("err verifying email", err);
          showError(
            err?.message ||
              err?.data?.message ||
              err?.error?.message ||
              "An error occurred, try again later"
          );
        });
    } else {
      //   showError("Cannot find email");
      navigate("/login");
    }
  }, [emailToVerify, resendTokenMutation, navigate]);

  useEffect(() => {
    if (codeResent) {
      const timer = setTimeout(() => {
        setCodeResent(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [codeResent]);

  const resendCode = () => {
    resendTokenMutation({ email: emailToVerify })
      .unwrap()
      .then(() => {
        showSuccess("Token sent");
        setCodeResent(true);
      })
      .catch((err) => {
        console.log("err verifying email", err);
        showError(
          err?.message ||
            err?.data?.message ||
            err?.error?.message ||
            "An error occurred, try again later"
        );
      });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const { code } = formState;

    const isFormEmpty = checkEmptyFields({
      code,
    });

    if (!isFormEmpty) {
      verifyEmailMutation({ email: emailToVerify, code })
        .unwrap()
        .then((resp) => {
          //   console.log(resp);
          localStorage.setItem("accessToken", resp?.data?.token);
          showSuccess("Email verified");
          navigate("/admin/ai-translator");
        })
        .catch((err) => {
          console.log("err verifying email", err);
          showError(
            err?.message ||
              err?.data?.message ||
              err?.error?.message ||
              "An error occurred, try again later"
          );
        });
    }
  };

  return (
    <AuthLayout heading="Verify your email">
      <form onSubmit={submitForm}>
        <CustomInput
          label="Enter OTP"
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
          isLoading={isVerifyEmailLoading}
          rounded="8px"
        >
          Verify
        </Button>
        <Button
          variant={"ghost"}
          w={"full"}
          fontWeight={500}
          _hover={{ bg: "transparent" }}
          onClick={resendCode}
          isDisabled={codeResent}
          isLoading={isResendTokenLoading}
        >
          Resend code
        </Button>
      </form>
    </AuthLayout>
  );
};

export default VerifyAccount;
