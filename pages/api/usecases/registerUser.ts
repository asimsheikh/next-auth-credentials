import { User, Repo, repo } from '../../../repository/repo';

export const registerUser = async (repo: Repo, params: User) => {
  const { username, password } = params;
  let result = await repo.registerUser({ username, password });
  return result;
};
