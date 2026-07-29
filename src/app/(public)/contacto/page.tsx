export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">Contacto</h1>
      <p className="mt-4 text-stone-600">
        Escribinos a{" "}
        <a href="mailto:info@posada.com" className="text-amber-800 hover:underline">
          info@posada.com
        </a>{" "}
        o llamanos al +54 11 0000-0000.
      </p>
    </div>
  );
}
