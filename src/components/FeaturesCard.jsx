export default function FeaturesCard ({image, title, subtitle}){
    return (
        <div className="flex flex-col m-3 border-gray-300 border rounded-lg p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d={image}
                      ></path>
                    </svg>
            <p className=" text-lg font-semibold pt-3 pb-1">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}