import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export default function UpdatePasswordPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-xl font-semibold text-stone-900">
        Nueva contraseña
      </h1>
      <UpdatePasswordForm />
    </>
  );
}
