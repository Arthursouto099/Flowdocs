import type { User } from "../types/ApiTypes";


export default function ProfileImage({ user }: { user: User }) {
    return (
        <div>
            {user?.profile_image ? (
                <img src="" alt="" />
            ) : (
                <div className="flex items-center justify-center h-6 w-6 p-1 rounded-md bg-blue-500 text-white font-semibold">
                    <h1 className="text-sm">
                        {user.name
                            ?.trim()
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map(n => n[0]?.toUpperCase())
                            .join("")}
                    </h1>
                </div>
            )}
        </div>
    )
}