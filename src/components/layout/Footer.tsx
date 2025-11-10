
const Footer = () => {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <p className="text-gray-400 text-xs">
                        © {currentYear} Euroleague Analytics. This is an independent platform and is not affiliated with Euroleague Basketball.
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
