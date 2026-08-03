import { Toaster as SonnerToaster } from "sonner";

/**
 * Punto único de montaje para las notificaciones de la app.
 * Se monta una sola vez desde el Layout.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{ className: "font-sans" }}
    />
  );
}

export default Toaster;
