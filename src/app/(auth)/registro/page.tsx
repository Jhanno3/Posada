import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-xl font-semibold text-stone-900">
        Crear cuenta
      </h1>
      <RegisterForm />
    </>
  );
}
