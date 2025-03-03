export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    author: string;
    text: string;
    createdAt: string;
  }
  