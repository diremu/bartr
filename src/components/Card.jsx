const Card = ({ image, title, subtitle, type = "item" }) => {
    // type: "item", "category", or "testimony"
    let cardClass = "flex flex-col items-center rounded-2xl bg-white ";
    let imgClass = "object-cover rounded mb-3 ";
    let titleClass = "text-center font-semibold text-left";
    let subtitleClass = "text-center mt-1 ";

    if (type === "category") {
        cardClass += "p-2 w-56 h-56 justify-start items-start";
        imgClass += "w-44 h-44 mb-2 rounded-lg";
        titleClass += "text-[16px] text-gray-700 mt-2";
    } else if (type === "testimony") {
        cardClass += "p-4 w-80 h-72 justify-center";
        imgClass += "w-52 h-52 rounded-full mb-4 rounded-sm";
        titleClass += "text-[18px] text-gray-700 mt-2 text-left";
        subtitleClass += "text-[14px] text-gray-500 text-left word-wrap";
    } else { // item
        cardClass += " w-64 h-64 items-start";
        imgClass += "w-36 h-36 mb-3 rounded-lg";
        titleClass += "text-[14px] text-gray-700 text-left";
        subtitleClass += "text-[13px] text-gray-400";
    }

    return (
        <div className={cardClass}>
            {image && (
                <img src={image} alt={title} className={imgClass} />
            )}
            <h2 className={titleClass}>{title}</h2>
            {subtitle && (
                <p className={subtitleClass}>{subtitle}</p>
            )}
        </div>
    );
};

export default Card;
