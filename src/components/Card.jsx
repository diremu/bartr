const Card = ({ image, title, subtitle, alt, onClick, type = "item" }) => {
    let cardClass = "flex flex-col items-center rounded-2xl bg-white ";
    let imgClass = "object-cover rounded mb-3 ";
    let titleClass = "text-center font-semibold text-left";
    let subtitleClass = "text-center mt-1 ";

    if (type === "category") {
        cardClass += "p-3 sm:p-4 w-full h-auto justify-start items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow";
        imgClass += "w-full h-24 sm:h-28 md:h-32 object-cover mb-2 sm:mb-3 rounded-lg";
        titleClass += "text-sm sm:text-base font-medium text-gray-700 text-center";
    } else if (type === "testimony") {
        cardClass += "p-4 w-full h-auto justify-start border border-gray-200 shadow-sm hover:shadow-md transition-shadow";
        imgClass += "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto sm:mx-0 mb-3 sm:mb-4";
        titleClass += "text-base sm:text-lg font-medium text-gray-800 text-center sm:text-left mb-2";
        subtitleClass += "text-sm sm:text-base text-gray-600 text-center sm:text-left leading-relaxed";
    } else {
        cardClass += "p-3 sm:p-4 w-48 sm:w-52 md:w-56 h-auto flex-shrink-0 items-start border border-gray-200 shadow-sm hover:shadow-md transition-shadow";
        imgClass += "w-full h-32 sm:h-36 object-cover mb-3 rounded-lg";
        titleClass += "text-sm sm:text-base font-medium text-gray-700 text-left mb-1";
        subtitleClass += "text-xs sm:text-sm text-gray-500 text-left";
    }

    return (
        <div className={cardClass} onClick={onClick}>
            {image && (
                <img src={image} alt={alt} className={imgClass} />
            )}
            <h2 className={titleClass}>{title}</h2>
            {subtitle && (
                <p className={subtitleClass}>{subtitle}</p>
            )}
        </div>
    );
};

export default Card;
