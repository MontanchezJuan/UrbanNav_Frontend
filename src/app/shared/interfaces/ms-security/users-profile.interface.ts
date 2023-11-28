export interface DataUserProfile {
  name: string;
  lastName: string;
  profilePhoto: string;
  birthday: string;
  backgroundImage: string;
  numberPhone: string;
  status: number;
}

export interface Response {
  message: string;
  data: UserProfile[];
}

export interface ResponseOne {
  message: string;
  data: UserProfile;
}

export interface UserProfile {
  _id: string;
  name: string;
  lastName: string;
  profilePhoto: string;
  birthday: string;
  backgroundImage: string;
  numberPhone: string;
  status: number;
}
