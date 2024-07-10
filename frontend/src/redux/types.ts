export interface UserDetailObj {
  // "settings": {
  //     "pushNotification": boolean,
  //     "emailNotification": boolean,
  //     "phoneNotification": boolean
  // },
  _id: string;
  email: string;
  isVerified: boolean;
  country: string;
  admin: boolean;
  role?: string;
  // "defaults": [],
  // "inventory": [],
  // "meterNos": [],
  createdAt: string;
}

export interface TranslateJob {
  _id: string;
  userId: string;
  jobSession: string;
  secure_url: string;
  public_id: string;
  filename?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportedLangObj {
  source: string[];
  target: string[];
}

export interface NotificationObj {
  _id: string;
  receiver: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// req bodies
export interface LoginBody {
  email: string;
  password: string;
  pushToken?: string;
}

export interface ResetPasswordBody {
  email: string;
  password: string;
  code: string | number;
}
