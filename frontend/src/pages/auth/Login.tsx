import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../utils/CustomInput";
import AuthLayout from "./AuthLayout";
import { showError, showSuccess } from "../../utils/Alert";
import { useLoginMutation } from "../../redux/services/authApi";
import { checkEmptyFields } from "../../utils/helpers";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // TODO: change to /dashboard
  const from = location.state?.from?.pathname || "/admin/ai-translator";
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
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
      loginMutation(formState)
        .unwrap()
        .then((resp) => {
          console.log(resp);
          localStorage.setItem("accessToken", resp?.data?.token);
          showSuccess("Login successful");
          navigate(from);
        })
        .catch((err) => {
          console.log("login err", err);
          const isEmailUnverified =
            err?.data?.error?.code === "email-unverified";
          if (isEmailUnverified) {
            showError("Email address not verified");
            navigate("/verify", { state: { email } });
          } else {
            showError(
              err?.message ||
                err?.data?.message ||
                err?.data?.error?.message ||
                "An error occurred, try again later"
            );
          }
        });
    }
  };

  return (
    <AuthLayout heading="Login">
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
        <Flex justify={"flex-end"}>
          <Button
            variant={"link"}
            _hover={{ textDecor: "none" }}
            as={Link}
            to={"/forgot-password"}
            fontWeight={500}
          >
            Forgot password?
          </Button>
        </Flex>
        <Button
          type="submit"
          colorScheme={"buttonPrimary"}
          mt={"29px"}
          w={"full"}
          height={"48px"}
          fontWeight={500}
          isLoading={isLoginLoading}
          rounded="8px"
        >
          Sign in
        </Button>
        <Button
          variant={"ghost"}
          as={Link}
          to={"/signup"}
          w={"full"}
          fontWeight={500}
          _hover={{ bg: "transparent" }}
        >
          Don't have an account? Sign up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
