import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { X } from 'lucide-react';
import type { User, UserUpdate } from '../../types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

export const EditProfileModal = ({ user, onClose }: EditProfileModalProps) => {
  const { updateUser } = useAuth();
  const [submitError, setSubmitError] = useState<string>('');

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<UserUpdate>({
    initialValues: {
      bio: user.bio || '',
      location: user.location || '',
      work: user.work || '',
      education: user.education || '',
    },
    onSubmit: async (formData) => {
      try {
        setSubmitError('');
        await updateUser(formData);
        onClose();
      } catch (error: any) {
        setSubmitError(error.message);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Textarea
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            value={values.bio}
            onChange={handleChange}
            error={errors.bio}
            rows={3}
          />

          <Input
            name="location"
            type="text"
            label="Location"
            placeholder="Where are you located?"
            value={values.location}
            onChange={handleChange}
            error={errors.location}
          />

          <Input
            name="work"
            type="text"
            label="Work"
            placeholder="What do you do for work?"
            value={values.work}
            onChange={handleChange}
            error={errors.work}
          />

          <Input
            name="education"
            type="text"
            label="Education"
            placeholder="Where did you study?"
            value={values.education}
            onChange={handleChange}
            error={errors.education}
          />

          {(submitError || errors.submit) && (
            <div className="text-red-600 text-sm">
              {submitError || errors.submit}
            </div>
          )}

          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
