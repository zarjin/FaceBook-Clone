// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  work?: string;
  education?: string;
  yourPosts: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  bio?: string;
  location?: string;
  work?: string;
  education?: string;
}

// Post Types
export interface Post {
  _id: string;
  user: User | string;
  text: string;
  image?: string;
  likes: string[];
  comments: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostCreate {
  text: string;
  image?: File;
}

export interface PostComment {
  comment: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (userData: UserRegistration) => Promise<void>;
  login: (userData: UserLogin) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (userData: UserUpdate) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  updateCover: (file: File) => Promise<void>;
}

export interface PostContextType {
  posts: Post[];
  isLoading: boolean;
  createPost: (postData: PostCreate) => Promise<void>;
  getAllPosts: () => Promise<void>;
  getPost: (postId: string) => Promise<Post | null>;
  likePost: (postId: string) => Promise<void>;
  commentPost: (postId: string, comment: string) => Promise<void>;
}

// Form Types
export interface FormErrors {
  [key: string]: string;
}

// Component Props Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

export interface UserProfileProps {
  user: User;
  isOwnProfile?: boolean;
}
