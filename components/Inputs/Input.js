const Input = ({ label, placeholder, type, step = null, value, handleChange }) => {
  return (
    <>
      <label className='text-gray-400 ml-2'>{label}:</label> 
      <div className='dark:bg-[#212226] rounded-lg border px-1 py-2 focus:shadow-md dark:border-transparent'>
        <div className='flex items-center space-x-3'>
          <input
            className='w-full bg-transparent px-3 text-gray-600 outline-none placeholder:text-sm dark:text-gray-300 md:placeholder:text-base'
            type={type}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>
    </>
  )
}

export default Input
