import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import userService from '../services/users';

const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(id),
    retry: false,
  });

  if (isLoading) return <div>loading...</div>;

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
