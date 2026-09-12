import { cn } from "@lib/utils";

export default function FormInput({
  id,
  name,
  label,
  error,
  className,
  containerClassName,
  ...inputProps
}) {
  const inputId = id ?? name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={containerClassName}>
      <label className="mb-2 block text-sm font-medium" htmlFor={inputId}>
        {label}
      </label>
      <input
        {...inputProps}
        className={cn(
          "h-12 w-full rounded-xl border bg-white/50 px-4 outline-none transition focus:border-[#292d27] focus:ring-2 focus:ring-[#292d27]/10",
          error ? "border-red-600" : "border-black/15",
          className,
        )}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-700" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
