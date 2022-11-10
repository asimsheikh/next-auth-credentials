import { User, Repo, repo } from '../../../repository/repo';

interface AddBlogPost {
  date: string;
  blog: string;
  username: string;
}

export const addBlogPost = async (repo: Repo, params: AddBlogPost) => {
  const { date, blog, username } = params;
  let result = await repo.addPost({ date, blog }, username);
  if (result.ok) {
    return result;
  } else {
    return { ok: false };
  }
};
