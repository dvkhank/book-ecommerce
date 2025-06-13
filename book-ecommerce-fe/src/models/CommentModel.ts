class CommentModel {
  id: number;
  content: string;
  rating: number;
  created_at: Date;

  constructor(id: number, content: string, rating: number, created_at: Date) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.created_at = new Date(created_at);
  }
}
export default CommentModel;
