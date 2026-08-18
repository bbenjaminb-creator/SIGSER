type LoginInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function LoginInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}: LoginInputProps) {
  return (
    <div className="mb-5 text-left">

      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-200"
          }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}