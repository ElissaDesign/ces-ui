
export const GetCurrentUser = () => {
    const user: any = localStorage.getItem('data');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}



type InputUser = {
    id: string;
  name: string;
  agency: string;
  email: string;
  role: string;
status: string;

};

type FinalUser = InputUser & {
  isVerified: boolean;
  avatarUrl: string;
  
};

const AVATAR_URL = '/assets/images/avatar/avatar-1.webp';

export function generateUsers(users: InputUser[] = []): FinalUser[] {
  return users.map((user:any, index) => {return {
    ...user,
    name: `${user.firstName} ${user.lastName}`,
    isVerified: Boolean(true),
    status: "Active",
    avatarUrl: AVATAR_URL,
  }});
}