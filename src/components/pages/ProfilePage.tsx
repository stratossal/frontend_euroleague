import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-gray-400 text-lg">Loading profile...</p>
            </div>
        );
    }
    const addr = (user as any).address || {};
    const address = [
        user.street ?? addr.street,
        user.number ?? addr.number,
        user.area ?? addr.area,
        user.municipality ?? addr.municipality,
        user.po ?? addr.po,
        user.country
    ].filter(Boolean).join(", ") || "-";



    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className=" pt-12 text-3xl text-center font-bold text-white mb-8 py-4 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                My Profile
            </h1>

            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <table className="min-w-full">
                    <tbody>
                    <tr className="bg-indigo-50">
                        <td className="px-6 py-4 font-semibold text-indigo-700">Name</td>
                        <td className="px-6 py-4 text-gray-800">{user.firstname} {user.lastname}</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-6 py-4 font-semibold text-indigo-700">Email</td>
                        <td className="px-6 py-4 text-gray-800">{user.email}</td>
                    </tr>
                    <tr className="bg-indigo-50">
                        <td className="px-6 py-4 font-semibold text-indigo-700">Phone</td>
                        <td className="px-6 py-4 text-gray-800">{user.phone || "-"}</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-6 py-4 font-semibold text-indigo-700">Favorite Team</td>
                        <td className="px-6 py-4 text-gray-800">{user.favTeam || "-"}</td>
                    </tr>
                    <tr className="bg-indigo-50">
                        <td className="px-6 py-4 font-semibold text-indigo-700">Address</td>
                        <td className="px-6 py-4 text-gray-800">{address}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfilePage;
