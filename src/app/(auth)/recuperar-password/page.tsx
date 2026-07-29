import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function RecoverPasswordPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-xl font-semibold text-stone-900">
        Recuperar contraseña
      </h1>
      <ResetPasswordForm />
    </>
  );
}
