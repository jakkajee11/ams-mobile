import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserTokenModel } from '~types/auths';
import { ProfileModel } from '~types/users';

const userTokenKey = 'userToken';
const userProfileKey = 'userProfile';
const Storages = {
  async getJson(key: string) {
    const storedValues = await AsyncStorage.getItem(key);
    return storedValues ? JSON.parse(storedValues) : null;
  },

  async getString(key: string) {
    return await AsyncStorage.getItem(key);
  },

  async getProfile(): Promise<ProfileModel | null> {
    const profile = await this.getString(userProfileKey);
    if (profile) return JSON.parse(profile) as ProfileModel;

    return null;
  },

  async getAccessToken() {
    const userToken = (await this.getJson(userTokenKey)) as UserTokenModel;
    return userToken?.access_token ?? '';
  },

  async getUserToken() {
    return (await this.getJson(userTokenKey)) as UserTokenModel;
  },

  async saveValue(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },

  async saveUserProfile(userProfile: string) {
    await AsyncStorage.setItem(userProfileKey, userProfile);
  },

  async saveUserToken(userToken: string) {
    await AsyncStorage.setItem(userTokenKey, userToken);
  },

  async saveUserName(userName: string) {
    await AsyncStorage.setItem('@__ui$', userName);
  },

  async saveUserSecret(userSecret: string) {
    // todo: encrypt _us
    await AsyncStorage.setItem('@__us$', userSecret);
  },

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },

  async removeUserToken() {
    await this.remove(userTokenKey);
    await this.remove(userProfileKey);
    await this.remove('@__ui$');
    await this.remove('@__us$');
  },
};

export default Storages;
