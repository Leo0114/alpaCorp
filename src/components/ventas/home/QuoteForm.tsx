import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { MdOutlineLock } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import t from "@/constants/ventas.json";

const copy = t.quote.form;

// Mínimos de mayoreo por familia de producto
const PRODUCTS = {
  "Tarimas Estándar": 100,
  "Tarimas Especiales": 100,
  "Cajas de Madera": 200,
  Huacales: 200,
} as const;

type Product = keyof typeof PRODUCTS;
const productNames = Object.keys(PRODUCTS) as [Product, ...Product[]];

const schema = z
  .object({
    name: z.string().trim().min(3, "Escribe tu nombre completo."),
    company: z.string().trim().min(2, "Indica tu empresa o planta."),
    email: z.email("Escribe un correo válido, ej. compras@empresa.com."),
    phone: z
      .string()
      .trim()
      .refine(
        (v) => v.replace(/\D/g, "").length >= 10,
        "Incluye un teléfono de 10 dígitos.",
      ),
    product: z.enum(productNames),
    quantity: z
      .number({ error: "Indica una cantidad estimada." })
      .int("Usa un número entero."),
    details: z.string().max(1000, "Máximo 1000 caracteres.").optional(),
  })
  .superRefine((data, ctx) => {
    const min = PRODUCTS[data.product];
    if (Number.isFinite(data.quantity) && data.quantity < min) {
      ctx.addIssue({
        code: "custom",
        path: ["quantity"],
        message: `El mínimo de mayoreo para ${data.product.toLowerCase()} es de ${min} piezas.`,
      });
    }
  });

type FormValues = z.infer<typeof schema>;

const inputClass =
  "h-11 w-full rounded-md border border-line bg-white px-3 text-[0.9375rem] text-ink placeholder:text-ink-subtle/70 transition-[border-color,box-shadow] duration-200 outline-none hover:border-navy-300 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/15 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: {
    id: string;
    describedBy?: string;
    invalid: boolean;
  }) => React.ReactNode;
}

function Field({ label, error, hint, className = "", children }: FieldProps) {
  const id = useId();
  const messageId = `${id}-msg`;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-[0.6875rem] leading-4 font-bold tracking-[0.08em] text-ink-muted uppercase"
      >
        {label}
      </label>
      {children({
        id,
        describedBy: error || hint ? messageId : undefined,
        invalid: !!error,
      })}
      {(error || hint) && (
        <p
          id={messageId}
          className={`text-[0.8125rem] leading-snug ${error ? "text-red-700" : "text-ink-subtle"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

function TextInput({
  registration,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  registration: UseFormRegisterReturn;
}) {
  return <input className={inputClass} {...props} {...registration} />;
}

export default function QuoteForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getFieldState,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { product: "Tarimas Estándar", details: "" },
  });

  const product = watch("product");
  const minimum = PRODUCTS[product];

  // Las tarjetas del catálogo preseleccionan el producto
  useEffect(() => {
    const select = (value?: string) => {
      if (!value || !(value in PRODUCTS)) return;
      setValue("product", value as Product, { shouldDirty: true });
      if (getFieldState("quantity").isTouched) trigger("quantity");
    };
    const onSelect = (e: Event) => select((e as CustomEvent<string>).detail);

    select(document.documentElement.dataset.quoteProduct);
    window.addEventListener("quote:select", onSelect);
    return () => window.removeEventListener("quote:select", onSelect);
  }, [setValue, getFieldState, trigger]);

  const onSubmit = async (data: FormValues) => {
    // TODO: conectar con el endpoint de envío (Resend) cuando exista el backend
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("Solicitud de cotización", data);
    toast.success(copy.success, { description: copy.successDetail });
    reset({ product: data.product, details: "" });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre completo" error={errors.name?.message}>
            {({ id, describedBy, invalid }) => (
              <TextInput
                id={id}
                type="text"
                autoComplete="name"
                placeholder="Ej. Juan Pérez"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                registration={register("name")}
              />
            )}
          </Field>
          <Field label="Empresa / Planta" error={errors.company?.message}>
            {({ id, describedBy, invalid }) => (
              <TextInput
                id={id}
                type="text"
                autoComplete="organization"
                placeholder="Ej. Manufactura Regiomontana S.A."
                aria-invalid={invalid}
                aria-describedby={describedBy}
                registration={register("company")}
              />
            )}
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Correo corporativo" error={errors.email?.message}>
            {({ id, describedBy, invalid }) => (
              <TextInput
                id={id}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Ej. compras@empresa.com"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                registration={register("email")}
              />
            )}
          </Field>
          <Field label="Teléfono / WhatsApp" error={errors.phone?.message}>
            {({ id, describedBy, invalid }) => (
              <TextInput
                id={id}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Ej. 81 1234 5678"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                registration={register("phone")}
              />
            )}
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Producto de interés" error={errors.product?.message}>
            {({ id, describedBy, invalid }) => (
              <div className="relative">
                <select
                  id={id}
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={`${inputClass} appearance-none pr-10`}
                  {...register("product", {
                    onChange: () =>
                      getFieldState("quantity").isTouched &&
                      trigger("quantity"),
                  })}
                >
                  {productNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
                </svg>
              </div>
            )}
          </Field>
          <Field
            label="Cantidad estimada"
            error={errors.quantity?.message}
            hint={`Mínimo ${minimum} piezas para ${product.toLowerCase()}.`}
          >
            {({ id, describedBy, invalid }) => (
              <TextInput
                id={id}
                type="number"
                inputMode="numeric"
                min={minimum}
                step={1}
                placeholder={`Desde ${minimum} piezas`}
                className={`${inputClass} tabular-nums`}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                registration={register("quantity", { valueAsNumber: true })}
              />
            )}
          </Field>
        </div>

        <Field
          label="Detalles o medidas especiales (opcional)"
          error={errors.details?.message}
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              rows={3}
              placeholder="Ej. Medidas 120 × 100 cm, requiero sello NOM-144"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={`${inputClass} h-auto resize-none py-2.5 leading-relaxed`}
              {...register("details")}
            />
          )}
        </Field>

        <div className="flex flex-col gap-3 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-orange text-[0.9375rem] font-bold tracking-[0.02em] text-white shadow-[0_1px_2px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.18)] transition-[scale,background-color,opacity] duration-200 ease-spring select-none hover:bg-orange-hover active:scale-[0.98] active:duration-75 disabled:cursor-progress disabled:opacity-80"
          >
            {isSubmitting && (
              <span
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                aria-hidden="true"
              />
            )}
            {isSubmitting ? copy.sending : copy.submit}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-ink-subtle">
            <MdOutlineLock className="size-3.5 shrink-0" aria-hidden="true" />
            {copy.privacy}
          </p>
        </div>
      </form>
      <Toaster position="bottom-center" richColors closeButton />
    </>
  );
}
