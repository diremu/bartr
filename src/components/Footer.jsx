
const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full pb-4 sm:pb-6 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl p-4 gap-4 sm:gap-0 text-gray-500 font-[550] text-sm sm:text-[15px] xl:text-[17px]">
                <span className='hover:underline cursor-pointer'>About Us</span>
                <span className='hover:underline cursor-pointer'>Contact</span>
                <span className='hover:underline cursor-pointer'>Terms and Conditions</span>
            </div>
            <div className='flex justify-center items-center w-full max-w-6xl gap-6 sm:gap-8 p-4 text-gray-500 font-[550] text-base sm:text-lg'>
                <span className="hover:text-gray-700 cursor-pointer transition-colors">T</span>
                <span className="hover:text-gray-700 cursor-pointer transition-colors">R</span>
                <span className="hover:text-gray-700 cursor-pointer transition-colors">F</span>
            </div>
            <div className="text-center">
                <p className="text-gray-500 text-base sm:text-lg font-[550]">© 2025 Bartr. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer