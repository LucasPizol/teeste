import { api } from "@/api/api";
import { Post, PostDTO } from "@/interfaces/post";

export class PostService {
  async createPost(data: PostDTO): Promise<Post> {
    return await api.post("/posts", data);
  }

  async getPosts(): Promise<Post[]> {
    return await api.get("/posts");
  }

  async getPost(id: string): Promise<Post> {
    return await api.get(`/posts/${id}`);
  }

  async updatePost(id: string, data: PostDTO): Promise<Post> {
    return await api.put(`/posts/${id}`, data);
  }

  async deletePost(id: string): Promise<void> {
    return await api.delete(`/posts/${id}`);
  }
}

export const postService = new PostService();