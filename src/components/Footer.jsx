import { useNavigate } from "react-router"

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center w-full pb-6">
            <div className="flex justify-between items-center w-full max-w-6xl p-4 text-gray-500 font-[550] text-[15px] xl:text-[17px]">
                <span className='hover:underline'>About Us</span>
                <span className='hover:underline'>Contact</span>
                <span className='hover:underline'>Terms and Conditions</span>
            </div>
            <div className='flex justify-center items-center  w-full max-w-6xl gap-4 p-4 text-gray-500 font-[550] text-[15px] xl:text-[17px]'>
                <span>T</span>
                <span>R</span>
                <span>F</span>
            </div>
            <div>
                <p className="text-gray-500 text-[18px] font-[550]">© 2025 Bartr. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer