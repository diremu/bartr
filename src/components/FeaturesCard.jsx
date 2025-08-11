export default function FeaturesCard ({image, title, subtitle}){
    return (
        <div className="flex flex-col p-4 sm:p-5 lg:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white h-full">
            <div className="flex justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d={image}></path>
                </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 text-center">{title}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center flex-grow">{subtitle}</p>
        </div>
    )
}