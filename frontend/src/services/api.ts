import axios, { type AxiosResponse } from 'axios';
import type {
  User,
  UserRegistration,
  UserLogin,
  UserUpdate,
  Post,
  PostCreate,
} from '../types';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: UserRegistration): Promise<User> => {
    const response: AxiosResponse<User> = await api.post(
      '/api/auth/register',
      userData
    );
    return response.data;
  },

  login: async (userData: UserLogin): Promise<User> => {
    const response: AxiosResponse<User> = await api.post(
      '/api/auth/login',
      userData
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout');
  },

  checkAuth: async (): Promise<{ Authorized: boolean }> => {
    const response = await api.get('/api/auth/cheak-auth');
    return response.data;
  },
};

// User API
export const userAPI = {
  getCurrentUser: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/api/user/get-user');
    return response.data;
  },

  getOtherUser: async (userId: string): Promise<User> => {
    const response: AxiosResponse<User> = await api.get(
      `/api/user/get-other-user/${userId}`
    );
    return response.data;
  },

  updateUser: async (userData: UserUpdate): Promise<User> => {
    const response: AxiosResponse<User> = await api.put(
      '/api/user/user',
      userData
    );
    return response.data;
  },

  updateAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response: AxiosResponse<User> = await api.put(
      '/api/user/user/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  updateCover: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('cover', file);

    const response: AxiosResponse<User> = await api.put(
      '/api/user/user/cover',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};

// Post API
export const postAPI = {
  createPost: async (postData: PostCreate): Promise<Post> => {
    const formData = new FormData();
    formData.append('text', postData.text);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    const response: AxiosResponse<Post> = await api.post(
      '/api/post/create-post',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  getAllPosts: async (): Promise<Post[]> => {
    const response: AxiosResponse<Post[]> = await api.get(
      '/api/post/get-all-posts'
    );
    return response.data;
  },

  getPost: async (postId: string): Promise<Post> => {
    const response: AxiosResponse<Post> = await api.get(
      `/api/post/get-post/${postId}`
    );
    return response.data;
  },

  likePost: async (postId: string): Promise<string> => {
    const response: AxiosResponse<string> = await api.put(
      `/api/post/like-post/${postId}`
    );
    return response.data;
  },

  commentPost: async (
    postId: string,
    comment: string
  ): Promise<{ message: string }> => {
    const response = await api.put(`/api/post/comment-post/${postId}`, {
      comment,
    });
    return response.data;
  },
};

export default api;
