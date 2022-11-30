import { Outlet } from "@remix-run/react";

export default function Config() {
  return (
    <div className="p-5">
      <h1 className="pb-2 text-2xl font-bold">Config</h1>
      <Outlet />
    </div>
  );
}
