import { Groups } from "../models/groups";

export const groupsProviders = [
  {
    provide: 'GROUP_REPOSITORY',
    useValue: Groups
  }
];
