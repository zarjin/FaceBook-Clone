import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import { useForm } from '../../hooks/useForm';
import { validatePostText, validateImageFile } from '../../utils/validation';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { User, Image, X } from 'lucide-react';
import type { PostCreate } from '../../types';

export const CreatePost = () => {
  const { user } = useAuth();
  const { createPost } = usePost();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm<{ text: string }>({
    initialValues: {
      text: '',
    },
    validate: (formValues) => {
      const textError = validatePostText(formValues.text);
      const errors: { text?: string } = {};
      if (textError) {
        errors.text = textError;
      }
      return errors;
    },
    onSubmit: async (formData) => {
      try {
        setSubmitError('');

        const postData: PostCreate = {
          text: formData.text,
          image: selectedImage || undefined,
        };

        await createPost(postData);
        resetForm();
        setSelectedImage(null);
        setImagePreview(null);
      } catch (error: any) {
        setSubmitError(error.message);
      }
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateImageFile(file);
      if (validationError) {
        setSubmitError(validationError);
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setSubmitError('');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start space-x-3">
        {user?.avatar ? (
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.avatar}
            alt={user.name}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
        )}

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              name="text"
              placeholder={`What's on your mind, ${user?.name}?`}
              value={values.text}
              onChange={handleChange}
              error={errors.text}
              rows={3}
              className="resize-none"
            />

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {submitError && (
              <div className="text-red-600 text-sm">{submitError}</div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  <Image size={16} />
                  <span>Photo</span>
                </button>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting || !values.text.trim()}
              >
                Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
