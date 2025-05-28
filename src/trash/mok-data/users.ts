export interface User {
    id:UserId;
    name:string;
    description:string;
}

export type UserId = string;

export const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
  }));
