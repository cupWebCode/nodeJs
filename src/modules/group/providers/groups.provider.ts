import { Groups } from "../models/groups";
import { UserGroups } from "../models/user-groups";

export const groupsProviders = [
  {
    provide: 'GROUP_REPOSITORY',
    useValue: Groups
  },
  {
    provide: 'GROUP_USERG_ROUPS',
    useValue: UserGroups
  }
];
