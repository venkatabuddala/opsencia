import SignInLayer from "../components/SignInLayer";
import usePageTitle from "../hooks/usePageTitle";

const SignInPage = () => {
  usePageTitle('Sign In');
  return (
    <>
      {/* SignInLayer */}
      <SignInLayer />
    </>
  );
};

export default SignInPage;
