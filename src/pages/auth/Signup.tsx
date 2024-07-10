import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../utils/CustomInput";
import AuthLayout from "./AuthLayout";
import { checkEmptyFields } from "../../utils/helpers";
import { showError, showSuccess } from "../../utils/Alert";
import { useSignUpMutation } from "../../redux/services/authApi";

const Signup = ({ signInEmail }: { signInEmail?: string }) => {
  const navigate = useNavigate();
  const [signupMutation, { isLoading: isSignupLoading }] = useSignUpMutation();
  const [formState, setFormState] = useState({
    email: signInEmail || "",
    password: "",
    // pushToken: "",
  });

  const handleInputs = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const { email, password } = formState;

    const isFormEmpty = checkEmptyFields({
      email,
      password,
    });

    if (!isFormEmpty) {
      if (password.length < 6) {
        showError("Password should be at least 6 characters");
        return;
      }

      signupMutation({ email, password })
        .unwrap()
        .then((resp) => {
          console.log(resp);
          showSuccess("User registration successful");
          navigate("/verify", { state: { email } });
        })
        .catch((err) => {
          console.log("err verifying email", err);
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
    <AuthLayout heading="Create a new account">
      <form onSubmit={submitForm}>
        <CustomInput
          label="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputs}
          mb="13px"
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleInputs}
          mb="13px"
        />
        {/* <CustomInput
          label="Push token"
          name="pushToken"
          type="text"
          value={formState.pushToken}
          onChange={handleInputs}
          mb="13px"
        /> */}
        <Button
          type="submit"
          colorScheme={"buttonPrimary"}
          mt={"29px"}
          w={"full"}
          height={"48px"}
          fontWeight={500}
          isLoading={isSignupLoading}
          rounded="8px"
        >
          Sign up
        </Button>
        <Button
          variant={"ghost"}
          as={Link}
          to={"/login"}
          w={"full"}
          fontWeight={500}
          _hover={{ bg: "transparent" }}
        >
          Already have an account? Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
