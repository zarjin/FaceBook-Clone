import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Heart, MessageCircle, User } from 'lucide-react';
import type { PostCardProps } from '../../types';

export const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const { user: currentUser } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  // Handle post user - it could be populated or just an ID
  const postUser = typeof post.user === 'object' ? post.user : null;
  const isLiked = currentUser ? post.likes.includes(currentUser._id) : false;

  const handleLike = () => {
    if (onLike) {
      onLike(post._id);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || !onComment) return;

    try {
      setIsCommenting(true);
      await onComment(post._id, commentText);
      setCommentText('');
      setShowCommentForm(false);
    } catch (error) {
      console.error('Failed to comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          {postUser?.avatar ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={postUser.avatar}
              alt={postUser.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {postUser?.name || 'Unknown User'}
            </h3>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-900 whitespace-pre-wrap">{post.text}</p>

        {post.image && (
          <div className="mt-3">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.likes.length} likes</span>
          <span>{post.comments.length} comments</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isLiked
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span>Like</span>
          </button>

          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <MessageCircle size={16} />
            <span>Comment</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {post.comments.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="space-y-2">
            {post.comments.slice(0, 3).map((comment, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-900">{comment}</span>
              </div>
            ))}
            {post.comments.length > 3 && (
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all {post.comments.length} comments
              </button>
            )}
          </div>
        </div>
      )}

      {/* Comment Form */}
      {showCommentForm && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-start space-x-3">
            {currentUser?.avatar ? (
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={handleComment}
                  isLoading={isCommenting}
                  disabled={!commentText.trim() || isCommenting}
                >
                  Comment
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowCommentForm(false);
                    setCommentText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
