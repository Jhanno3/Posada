export function PublicFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-stone-500">
        © {new Date().getFullYear()} Posada. Todos los derechos reservados.
      </div>
    </footer>
  );
}
