import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Auth() {
  const headerList = headers();

  const cookieHeader = headerList.get("cookie");

  const authCookie = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("connect.sid="))
    ?.split("=")[1];

  if (!authCookie) {
    redirect("/");
  }
  try {
    const res = fetch("http://localhost:4000/profile", {
      headers: {
        cookie: `connect.sid=${authCookie}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/");
    }

    return res.join();
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
