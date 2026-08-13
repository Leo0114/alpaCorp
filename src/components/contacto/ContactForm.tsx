import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { contactForm } from "@/constants/contacto";

const { fields, errors: messages } = contactForm;

const schema = z.object({
  nombre: z.string().trim().min(3, messages.nombreMin),
  correo: z.email(messages.correoInvalid),
  telefono: z
    .string()
    .trim()
    .min(10, messages.telefonoMin)
    .regex(/^[\d\s()+-]+$/, messages.telefonoInvalid),
  mensaje: z.string().trim().min(10, messages.mensajeMin),
});

export type ContactValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-secondary focus:outline-none";
const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted";
const errorClass = "mt-2 text-xs font-medium text-red-500";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", correo: "", telefono: "", mensaje: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      const { error } = await actions.send(values);

      if (error) throw new Error(error.message);

      toast.success(contactForm.successTitle, {
        description: contactForm.successText,
      });
      reset();
    } catch {
      toast.error(contactForm.errorTitle, {
        description: contactForm.errorText,
      });
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="nombre" className={labelClass}>
          {fields.nombre.label}
        </label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          placeholder={fields.nombre.placeholder}
          aria-invalid={Boolean(errors.nombre)}
          className={fieldClass}
          {...register("nombre")}
        />
        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="correo" className={labelClass}>
            {fields.correo.label}
          </label>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            placeholder={fields.correo.placeholder}
            aria-invalid={Boolean(errors.correo)}
            className={fieldClass}
            {...register("correo")}
          />
          {errors.correo && (
            <p className={errorClass}>{errors.correo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClass}>
            {fields.telefono.label}
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            placeholder={fields.telefono.placeholder}
            aria-invalid={Boolean(errors.telefono)}
            className={fieldClass}
            {...register("telefono")}
          />
          {errors.telefono && (
            <p className={errorClass}>{errors.telefono.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>
          {fields.mensaje.label}
        </label>
        <textarea
          id="mensaje"
          rows={5}
          placeholder={fields.mensaje.placeholder}
          aria-invalid={Boolean(errors.mensaje)}
          className={`${fieldClass} resize-y`}
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p className={errorClass}>{errors.mensaje.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? contactForm.submitting : contactForm.submit}
      </button>
    </form>
  );
}

export default ContactForm;
