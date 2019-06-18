import { UserProfile } from './user-profile.model';

export interface Post {
    
    id?: number;
    description?: string;
    createdBy?: number
    createdAt?: Date;
    userProfile?: UserProfile;
}