import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <Link to="/config" className="text-xl text-blue-600 underline">
        Config
      </Link>
    </main>
  );
}
