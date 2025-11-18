import {Link} from "react-router";

const HomePage = () => {
    // const links=[
    //     {path:"/", label:"Home Page"},
    //     {path:"/teams", label:"Teams"},
    //     {path:"/teams/12", label:"Team (ID:12)"},
    // ]

    return (
        <div className="min-h-screen">
            <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Welcome to {' '}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Euroleague Analytics
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Your ultimate platform for in-depth basketball statistics,
                        player performance analysis, and team insights. Dive into
                        advanced metrics and transform how you understand the game.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/register"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/stats"
                            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
                        >
                            Explore Stats
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Why Choose Our Platform?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">📊</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Advanced Analytics</h3>
                            <p className="text-gray-600 text-lg">
                                Access deep statistical insights with real-time data updates and comprehensive metrics.
                            </p>
                        </div>


                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">👥</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Player Profiles</h3>
                            <p className="text-gray-600 text-lg">
                                Detailed player performance analysis, career stats, and comparison tools.
                            </p>
                        </div>


                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">🏆</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Team Insights</h3>
                            <p className="text-gray-600 text-lg">
                                Team performance tracking, strategy analysis, and season-long statistics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Current Season Leaders
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">-</div>
                            <h3 className="text-lg font-semibold text-gray-900">Points Leader</h3>
                            <p className="text-gray-500">Top scorer</p>
                        </div>


                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">-</div>
                            <h3 className="text-lg font-semibold text-gray-900">Rebounds Leader</h3>
                            <p className="text-gray-500">Most rebounds</p>
                        </div>


                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">-</div>
                            <h3 className="text-lg font-semibold text-gray-900">Assists Leader</h3>
                            <p className="text-gray-500">Playmaking master</p>
                        </div>


                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">-</div>
                            <h3 className="text-lg font-semibold text-gray-900">Efficiency</h3>
                            <p className="text-gray-500">Performance rating</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Game Analysis?
                    </h2>

                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of basketball enthusiasts and professionals using our platform for advanced analytics.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/register"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/players"
                            className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition"
                        >
                            Browse Players
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;