import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "@/components/loader";
import { ThreeDots } from "react-loader-spinner";

const withTokenRedirect = (WrappedComponent) => {
  return function PublicRoute(props) {
    const { authToken, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (authToken) {
        router.push("/dashboard");
      }
    }, [authToken, router]);

    if (authToken) {
      return (
        <div className="flex h-screen justify-center items-center">
          <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="#4f46e5"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withTokenRedirect;
