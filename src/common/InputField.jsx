/* eslint-disable react/prop-types */

export default function InputField({
  label,
  name,
  type,
  register,
  errors,
  placeholder,
}) {
  return (
    <div className='mb-4'>
      <label className='mb-2 block font-satoshi text-base font-medium text-dark'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3.5 py-2 text-dark outline-none 
        ${errors[name] ? "border-red-500" : "border-gray-3"}`}
        {...register(name)}
      />
      {errors[name] && (
        <p className='text-red-500 text-sm mt-1'>{errors[name]?.message}</p>
      )}
    </div>
  );
}
