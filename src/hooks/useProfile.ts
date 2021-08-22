import Storages from '~utils/Storages';

export default function useProfile() {
  const profile = Storages.getProfile();

  return {
    profile,
  };
}
