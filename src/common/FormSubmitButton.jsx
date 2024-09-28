/* eslint-disable react/prop-types */
export default function FormSubmitButton({ children }) {
	return (
		<button
			type='submit'
			className='border border-purple-500 text-purple-500 w-full rounded-full px-6 py-2 hover:bg-purple-500 hover:text-white transition duration-300'
		>
			{children}
		</button>
	);
}