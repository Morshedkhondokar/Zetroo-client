import { useEffect, useState } from "react";
import useAuth from "../../../components/hooks/useAuth";
import { imageUpload } from "../../../components/api/uploadImg";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { FaEdit, FaTimes, FaCamera, FaSignOutAlt } from "react-icons/fa"; 

const Profile = () => {
    const { user, updateUserProfile, logOut } = useAuth();

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.displayName || "");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    // Default avatar if photoURL is missing
    const defaultAvatar = "https://i.pinimg.com/736x/66/2b/be/662bbef42e07620cbea41e3ac63a74eb.jpg"; 

    // Image Preview
    useEffect(() => {
        if (imageFile instanceof File) {
            const previewUrl = URL.createObjectURL(imageFile);
            setImagePreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        } 
        // Reset preview to user's current photo if imageFile is nullified 
        if (!imageFile && !editMode) {
            setImagePreview(user?.photoURL || defaultAvatar);
        }
    }, [imageFile, editMode, user?.photoURL]);


    // Save Profile
    const handleSave = async () => {
        if (name === user?.displayName && !imageFile) {
            toast("No changes detected.", { icon: 'ℹ️' });
            setEditMode(false);
            return;
        }
        
        try {
            setLoading(true);

            let photoURL = user?.photoURL;

            if (imageFile) {
                // Show uploading toast
                toast.loading("Uploading image...", { id: 'image-upload' });
                photoURL = await imageUpload(imageFile);
                toast.success("Image uploaded!", { id: 'image-upload' });
            }

            await updateUserProfile(name, photoURL);

            toast.success("Profile updated successfully!");
            setEditMode(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Cancel Edit
    const handleCancel = () => {
        setName(user?.displayName || "");
        setImagePreview(user?.photoURL || defaultAvatar);
        setImageFile(null);
        setEditMode(false);
    };

    // 🔹 Handle Logout (Added confirmation and simple call)
   const handleLogout = async () => {
  if (window.confirm("Are you sure you want to log out?")) {
    await logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch(err => toast.error("Logout failed."));
  }
};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* --- Profile Header/Photo Section --- */}
                <div className="bg-[url('https://i.pinimg.com/736x/4d/1a/7f/4d1a7ff3ff18bb8c8789b07c664b4dab.jpg')] h-40 relative flex justify-center pt-16">
                    
                    {/* Avatar Container */}
                    <div className={`absolute -bottom-16 w-32 h-32 rounded-full border-4 ${editMode ? 'border-red-400' : 'border-white'} shadow-xl overflow-hidden`}>
                        <img
                            src={imagePreview || defaultAvatar}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />

                        {/* Photo Change Overlay (Edit Mode Only) */}
                        {editMode && (
                            <label 
                                className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer transition hover:bg-black/70"
                                title="Change Photo"
                            >
                                <FaCamera className="text-white w-6 h-6" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* --- Profile Details & Actions Section --- */}
                <div className="p-8 pt-20">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                        My Profile
                    </h2>
                    
                    <div className="space-y-6">
                        
                        {/* Name Field */}
                        <div className="border border-gray-200 rounded-xl p-4 transition duration-200 hover:shadow-sm">
                            <label className="text-sm font-semibold text-gray-500 block mb-1">Display Name</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full text-gray-800 font-medium text-lg border-none p-0 focus:ring-0"
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <p className="font-bold text-xl text-gray-900">{user?.displayName || "N/A"}</p>
                            )}
                        </div>

                        {/* Email Field (Read-only) */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                            <label className="text-sm font-semibold text-gray-500 block mb-1">Email Address (Read-only)</label>
                            <p className="font-medium text-lg text-gray-700">{user?.email || "N/A"}</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 space-y-4"> {/* Added space-y-4 for separation */}
                        {!editMode ? (
                            <>
                                {/* Edit Profile Button (Primary action in view mode) */}
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                                >
                                    <FaEdit className="w-5 h-5" /> Edit Profile
                                </button>
                                
                                {/* 🚩 LOGOUT Button (Distinct design) */}
                                <button
                                    onClick={handleLogout} // Calls the new logout handler
                                    className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
                                >
                                    {/* 🚩 CHANGED: Icon to FaSignOutAlt */}
                                    <FaSignOutAlt className="w-5 h-5" /> Log Out
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={`flex-1 text-white py-3 rounded-xl font-bold text-lg shadow-md transition flex items-center justify-center ${
                                        loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                    }`}
                                >
                                    {loading ? <ImSpinner9 className="animate-spin mr-2" /> : "Save Changes"}
                                </button>

                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-gray-300 transition flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    <FaTimes className="w-4 h-4" /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;