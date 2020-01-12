import { User } from "src/interfaces/user";

export const createUser = `
  INSERT INTO public.users (id, login, password, age, isDeleted)
  VALUES ($1, $2, $3, $4, $5);
`;

export const getUser = `
  SELECT * FROM public.users WHERE id = $1;
`;

export const getUserList = `
  SELECT * FROM public.users;
`;

export const editUser = (user: User) => {
  return `
    UPDATE public.users
    SET login = '${user.login}', password = '${user.password}', age = ${user.age}, isdeleted = ${user.isDeleted}
    WHERE id = '${user.id}';
  `;
}

export const markUserAsDelete = (id: string) => {
  return `
    UPDATE public.users
    SET isdeleted = true
    WHERE id = '${id}';
  `;
}
