import { MapPin, Briefcase, GraduationCap, Mail } from 'lucide-react';
import type { User } from '../../types';

interface ProfileInfoProps {
  user: User;
}

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const infoItems = [
    {
      icon: Mail,
      label: 'Email',
      value: user.email,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: user.location,
    },
    {
      icon: Briefcase,
      label: 'Work',
      value: user.work,
    },
    {
      icon: GraduationCap,
      label: 'Education',
      value: user.education,
    },
  ];

  const visibleItems = infoItems.filter(item => item.value);

  if (visibleItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
        <p className="text-gray-500 text-center py-4">
          No additional information available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
      <div className="space-y-4">
        {visibleItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <IconComponent size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
