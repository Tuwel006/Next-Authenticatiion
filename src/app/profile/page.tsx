'use server'
import { cookies } from "next/headers";

type UserPayload = {
  id: string;
  userName: string;
  email: string;
};

const Profile = async () => {
  // Get cookies from the request
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/users/me`, {
    headers: {
      Cookie: cookieStore.toString(), // 👈 manually forward cookies
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center mt-8 text-red-500">
        Failed to load profile
      </div>
    );
  }

  const data = await res.json();
  const user: UserPayload = data.user;

  return (
    <div>
      <h1 className="text-center text-4xl mt-8 text-black">
        This is Profile Page
      </h1>
      <div>
        <h2 className="text-center text-2xl mt-4 text-black">
          Welcome, {user.userName}
        </h2>
        <h2 className="text-center text-2xl mt-4 text-black">
          Email: {user.email}
        </h2>
      </div>
    </div>
  );
};

export default Profile;
