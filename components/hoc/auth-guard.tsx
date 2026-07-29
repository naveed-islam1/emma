"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const hasMounted = useHasMounted();

    useEffect(() => {
      if (!hasMounted) return;

      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/signin");
      } else {
        setIsAuthenticated(true);
      }
    }, [hasMounted, router]);

    if (!hasMounted || isAuthenticated === null) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
