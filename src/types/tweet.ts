export interface Tweet {
  id: string;
  author_id: string;
  text: string;
  impression_count: number;
  reply_count: number;
  retweet_count: number;
  like_count: number;
  created_at: string;
  fetched_at: string | null;
}
