/**
 * @see https://umijs.org/docs/max/access#access
 * */
import { matchPermission } from './utils/permission';

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const hasPerms = (perm: string) => {
    return matchPermission(initialState?.currentUser?.perms, perm);
  };
  return {
    hasPerms,
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
