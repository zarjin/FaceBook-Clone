import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { Post, PostCreate, PostContextType } from '../types';
import { postAPI } from '../services/api';

export type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostContextProvider');
  }
  return context;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPost = async (postData: PostCreate): Promise<void> => {
    try {
      setIsLoading(true);
      const newPost = await postAPI.createPost(postData);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error: any) {
      console.error('Post creation failed:', error);
      throw new Error(error.response?.data?.message || 'Post creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getAllPosts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const allPosts = await postAPI.getAllPosts();
      setPosts(allPosts);
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const getPost = async (postId: string): Promise<Post | null> => {
    try {
      const post = await postAPI.getPost(postId);
      return post;
    } catch (error: any) {
      console.error('Failed to fetch post:', error);
      return null;
    }
  };

  const likePost = async (postId: string): Promise<void> => {
    try {
      await postAPI.likePost(postId);
      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            // This is a simplified update - in a real app you'd want to track the current user's like status
            return {
              ...post,
              likes: post.likes.includes('currentUserId') 
                ? post.likes.filter(id => id !== 'currentUserId')
                : [...post.likes, 'currentUserId']
            };
          }
          return post;
        })
      );
    } catch (error: any) {
      console.error('Failed to like post:', error);
      throw new Error(error.response?.data?.message || 'Failed to like post');
    }
  };

  const commentPost = async (postId: string, comment: string): Promise<void> => {
    try {
      await postAPI.commentPost(postId, comment);
      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, comment]
            };
          }
          return post;
        })
      );
    } catch (error: any) {
      console.error('Failed to comment on post:', error);
      throw new Error(error.response?.data?.message || 'Failed to comment on post');
    }
  };

  const value: PostContextType = {
    posts,
    isLoading,
    createPost,
    getAllPosts,
    getPost,
    likePost,
    commentPost,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
