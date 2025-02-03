const UserProfile = ({ params }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            Profile
            <span>{params.id}</span>
        </div>
    );
};

export default UserProfile;
