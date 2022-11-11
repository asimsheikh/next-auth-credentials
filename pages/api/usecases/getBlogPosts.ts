import { User, Repo, repo } from '../../../repository/repo';

interface GetBlogPosts {
  username: string;
}

export const getBlogPosts = async (repo: Repo, params: GetBlogPosts) => {
  const { username } = params;
  let result = await repo.getPosts(username);
  return { result, ok: true };
};
