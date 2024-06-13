// Profile.ts

export class Profile {
  name: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  socialSecurityNumber: string;
  address: string;
  doctor: string;
  allergies: string[];
  contact: { name: string; firstName: string; phoneNumber: string }[];

  constructor(data?: Partial<Profile>) {
    const defaultData = {
      name: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      address: '',
      socialSecurityNumber: '',
      doctor: '',
      allergies: [],
      contact: [],
    };
    Object.assign(this, { ...defaultData, ...data });
  }

  addAllergy(allergy: string) {
    this.allergies.push(allergy);
  }

  addContact(contact: { name: string; firstName: string; phoneNumber: string }) {
    this.contact.push(contact);
  }

  // add more methods for managing the profile data
}
