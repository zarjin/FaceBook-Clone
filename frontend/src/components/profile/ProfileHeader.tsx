import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Camera, User } from 'lucide-react';
import type { User as UserType } from '../../types';

interface ProfileHeaderProps {
  user: UserType;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export const ProfileHeader = ({ user, isOwnProfile = false, onEditClick }: ProfileHeaderProps) => {
  const { updateAvatar, updateCover } = useAuth();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await updateAvatar(file);
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await updateCover(file);
      } catch (error) {
        console.error('Failed to update cover:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        {user.cover && (
          <img
            src={user.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        {isOwnProfile && (
          <>
            <button
              onClick={() => coverInputRef.current?.click()}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Camera size={16} className="text-gray-700" />
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="relative inline-block">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center">
                <User size={48} className="text-gray-600" />
              </div>
            )}
            {isOwnProfile && (
              <>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
                >
                  <Camera size={16} className="text-gray-700" />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.bio && (
              <p className="mt-2 text-gray-700">{user.bio}</p>
            )}
          </div>
          
          {isOwnProfile && onEditClick && (
            <Button onClick={onEditClick} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
