export default function FeaturesCard ({image, title, subtitle}){
    return (
        <div className="flex flex-col ">
            <image src={image} />
            <p>{title}</p>
            <p>{subtitle}</p>
        </div>
    )
}