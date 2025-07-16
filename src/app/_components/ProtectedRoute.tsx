import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

const ProtectedRoute = async ({children}: { children: React.ReactNode }) => {

  const session = await auth();
  
  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}

export default ProtectedRoute