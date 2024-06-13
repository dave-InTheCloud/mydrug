import { Profile } from '../../model/Profile';

export const initialState = new Profile();

export function profileReducer(state: Profile, action: { type: string; payload?: any }) {
    switch (action.type) {
        case 'updateProperty':
            return { ...state, [action.payload.property]: action.payload.value };
        case 'clearProfile': {
            return new Profile();
        }
        default:
            return state;
    }
}


/**
export function reducer(state: Profile, action: { type: string; payload?: any }) {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.payload };
    case 'setFirstName':
      return { ...state, firstName: action.payload };
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPhoneNumber':
      return { ...state, phoneNumber: action.payload };
    case 'setBirthDate':
      return { ...state, birthDate: action.payload };
    case 'setAddress':
      return { ...state, address: action.payload };
    case 'setDoctor':
      return { ...state, doctor: action.payload };
    case 'addAllergy':
      return { ...state, allergies: [...state.allergies, action.payload] };
    case 'addContact':
      return { ...state, contact: [...state.contact, action.payload] };
    default:
      return state;
  }
}
 */