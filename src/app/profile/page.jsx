"use client";

import { UpdateUserModal } from "@/components/UpdateUserModal";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";

const ProfilePage = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    return (
        <div className="min-h-[60vh] flex items-center justify-center ">

            <Card className="max-w-96 w-full mx-auto flex flex-col items-center border p-4 space-y-2 shadow-xl card-stagger-appear">
                

                <div className="animate-hero-content">
                    <div className="relative h-24 w-24 rounded-full border-4 border-primary/20 hover:border-primary transition-all duration-500 shadow-lg overflow-hidden bg-gray-50 transform hover:scale-110">
                        <Avatar className="h-full w-full">
                            <Avatar.Image
                                alt={user?.name || "User"}
                                src={user?.image}
                                referrerPolicy="no-referrer"
                                className="object-cover"
                            />
                            <Avatar.Fallback className="bg-primary text-white font-bold text-2xl flex items-center justify-center w-full h-full">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </Avatar.Fallback>
                        </Avatar>
                    </div>
                </div>


                <div className="text-center space-y-1 animate-hero-sub-content">
                    <h2 className="text-2xl font-bold text-[#0a1d37]">
                        {user?.name}
                    </h2>
                    <p className="text-gray-500 text-sm italic">
                        {user?.email}
                    </p>
                </div>


                <div className="animate-hero-sub-content">
                    <span className="px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                        Verified Member
                    </span>
                </div>


                {/* <div className="w-full  animate-hero-sub-content text-center">
                    <UpdateUserModal />
                </div> */}
            </Card>
        </div>
    );
};

export default ProfilePage;