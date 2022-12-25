export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
}

export type ApiContact = Omit<Contact, 'id'>;