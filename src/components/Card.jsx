const Card = ({ image, title, subtitle, alt, onClick, type = "item" }) => {
    // type: "item", "category", or "testimony"
    let cardClass = "flex flex-col items-center rounded-2xl bg-white ";
    let imgClass = "object-cover rounded mb-3 ";
    let titleClass = "text-center font-semibold text-left";
    let subtitleClass = "text-center mt-1 ";

    if (type === "category") {
        cardClass += "p-2 w-56 h-48 md:w-[18%] md:h-[14vw] lg:w-[16%] lg:h-[12vw] xl:w-[15%] xl:h-[11vw] justify-start items-start";
        imgClass += "w-40 h-32 md:w-[85%] md:h-[75%] mb-2 rounded-lg";
        titleClass += "text-[16px] md:text-[17px] lg:text-[18px] text-gray-700 mt-2";
    } else if (type === "testimony") {
        cardClass += "p-4 w-80 h-72 md:w-[30%] md:h-[50%] lg:w-[28%] lg:h-80 xl:w-[26%] xl:h-[60%] justify-center";
        imgClass += "w-[85%] h-[80%] mb-4 rounded-sm";
        titleClass += "text-[18px] md:text-[19px] lg:text-[20px] text-gray-700 mt-2 text-left";
        subtitleClass += "text-[14px] md:text-[15px] lg:text-[15px] text-gray-500 text-left word-wrap";
    } else { // item
        cardClass += " w-64 h-64 items-start";
        imgClass += "w-36 h-36 mb-3 rounded-lg";
        titleClass += "text-[14px] text-gray-700 text-left";
        subtitleClass += "text-[13px] text-gray-400";
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
