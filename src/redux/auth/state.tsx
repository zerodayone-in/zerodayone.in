export default interface authstate {
  validated:boolean;
  authenticated: boolean;
  user: {
    id: string | undefined;
    username: string | null;
    usertag:string|null;
    identifier: string | null;
    createdAt: string | null;
    isAppliedUsername:boolean|null;
    isEmailVerified:boolean|null;
    isPoliciesAccepted:boolean|null;
    isSelectedAvatar:boolean|null;
    isSelectedGames:boolean|null;
    
  };
  token: string | null;
  otp:{
    ghostcode:string;
    id:string;
  };
  accessToken:string|null
}

