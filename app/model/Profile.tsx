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
  
    constructor() {
      this.name = '';
      this.firstName = '';
      this.email = '';
      this.phoneNumber = '';
      this.birthDate = '';
      this.address = '';
      this.socialSecurityNumber = '';
      this.doctor = '';
      this.allergies = [];
      this.contact = [];
    }
  
    addAllergy(allergy: string) {
      this.allergies.push(allergy);
    }
  
    addContact(contact: { name: string; firstName: string; phoneNumber: string }) {
      this.contact.push(contact);
    }
  
    // add more methods for managing the profile data
  }
  