import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {

  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return null;
  }

  if (!session || !session.user.isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}

export default ProtectedRoute