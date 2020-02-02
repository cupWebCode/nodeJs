import { PermissionType } from "../types";

export class GroupDto {
  readonly group_id: string;
  readonly name: string;
  readonly permissions: PermissionType[];;
}
