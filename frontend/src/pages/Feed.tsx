import { useEffect } from 'react';
import { usePost } from '../context/PostContext';
import { Layout } from '../components/layout/Layout';
import { CreatePost } from '../components/posts/CreatePost';
import { PostCard } from '../components/posts/PostCard';
import { Loading } from '../components/ui/Loading';

export default function Feed() {
  const { posts, isLoading, getAllPosts, likePost, commentPost } = usePost();

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    try {
      await commentPost(postId, comment);
    } catch (error) {
      console.error('Failed to comment on post:', error);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Create Post */}
        <CreatePost />

        {/* Posts Feed */}
        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center py-8">
            <Loading size="lg" text="Loading posts..." />
          </div>
        ) : (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No posts yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Be the first to share something!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
