import { Profile } from "../../model/Profile";
import { StorageService } from "../LocalStorageService";

export class ProfileService {
  private readonly storage: StorageService<Profile>;
  private readonly key: string = 'user-profile';

  constructor() {
    this.storage = new StorageService<Profile>();
  }

  async getProfile(): Promise<Profile> {
    const profile = await this.storage.get(this.key);
    if (profile) {
      return profile;
    } else {
      // Return a default profile object if the stored profile is null
      return {
        name: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        address: '',
        doctor: '',
        allergies: [],
        contact: [],
      };
    }
  }

  async setProfile(profile: Profile): Promise<void> {
    await this.storage.set(this.key, profile);
  }

  async removeProfile(): Promise<void> {
    await this.storage.remove(this.key);
  }

  async pushContact(contact: { name: string, firstName: string, phoneNumber: string }): Promise<void> {
    const profile = await this.getProfile();
    profile.contact.push(contact);
    await this.setProfile(profile);
  }

  async pushAllergy(allergy: { name: string }): Promise<void> {
    const profile = await this.getProfile();
    profile.allergies.push(allergy);
    await this.setProfile(profile);
  }

  async clearProfile(): Promise<void> {
    if (this.storage) {
      await this.removeProfile();
    }
  }
}
