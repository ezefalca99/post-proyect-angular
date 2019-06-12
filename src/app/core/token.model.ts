import {Role} from './role.model';

export interface Token {
  accessToken: string;
  user?: string;
  name?: string;
  roles?: Array<Role>;
}
