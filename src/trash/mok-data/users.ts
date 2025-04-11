export interface User {
    id:string;
    name:string;
    description:string;
}


export const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
    id: `user${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for User ${index + 11}`,
  }));
