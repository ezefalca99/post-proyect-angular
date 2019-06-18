import {Role} from './role.model';

export class Token {
  accessToken?: string;
  user?: string;
  name?: string;
  roles?: Array<Role>;
}
