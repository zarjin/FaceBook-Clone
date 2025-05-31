import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/layout/Layout';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileInfo } from '../components/profile/ProfileInfo';
import { EditProfileModal } from '../components/profile/EditProfileModal';

export default function Profile() {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-8">
          <p className="text-gray-500">User not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader
          user={user}
          isOwnProfile={true}
          onEditClick={() => setIsEditModalOpen(true)}
        />
        <ProfileInfo user={user} />

        {isEditModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
}
