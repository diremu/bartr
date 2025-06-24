import Navbar from './components/Navbar';

export default function Landing() {
    return (
        <div className="w-screen outline-1 outline-red-500 h-screen">
            <Navbar />
            <h1 className="text-red-300">We have landed</h1>
        </div>
    )
}