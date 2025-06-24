import Navbar from './components/Navbar';

export default function Landing() {
    const imgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB9TxmopJZytwUCJUiPSVwGKGBUN35kGNQ9nTZ0QCeZL2GDs-8Rm3yuwK9uTiy1XM2fchfQRrWc_28tvjaxB82rPJ0qAclVCUGCim3nOcto0bvjw4ddwkcOHyuE08I_M0EFS9GLACaBCU1aOBpzcRhbMYiy65p5LrUJvFaCdMvamZs1SfS--T3c2r5uGwUuaGavDQskVvMFF2-OBJP7zkLJ6OqibgfRKky4uGBX4VNuqN98c45P7efWhYXijdbNyHwfIUvzuR7Hsn8";
    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="flex justify-center h-full">
                <div className="p-6 w-full max-w-4xl">
                    <img className="w-full h-80 object-cover bg-center bg-no-repeat bg-cover rounded-xl" src={imgUrl} />
                </div>
            </div>
        </div>
    )
}