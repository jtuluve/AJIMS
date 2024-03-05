import { User as TUser } from "../api/user/User";

export const USER_TITLE_FIELD = "name";

export const UserTitle = (record: TUser): string => {
  return record.name?.toString() || String(record.id);
};
