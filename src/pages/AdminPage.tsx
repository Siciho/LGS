import PasswordResetTool from "@/components/PasswordResetTool";
import AdminSystemSettings from "@/components/AdminSystemSettings";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PasswordResetTool />
        <AdminSystemSettings />
      </div>
    </div>
  );
}