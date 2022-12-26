import React from 'react';
import { RootState } from '../../app/contact';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeClass, changeContact } from '../../contact/contactSlice';

interface Props {
    image: string;
    name: string;
    index: number;
};

const ContactCard: React.FC<Props> = ({ image, name, index }) => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector((state: RootState) => state.contact.contacts);

    const setContact = (index: number) => {
        dispatch(changeContact(contacts[index]));
    };

    
    const change = (index: number) => {
        setContact(index);
        dispatch(changeClass());
    };

    return (
        <>
            <div className='d-flex align-items-center my-3' style={{ border: '1px solid black' }} onClick={() => change(index)}>
                <img src={image} alt="Person" style={{ width: '8rem', height: '8rem' }} className='me-5' />
                <h3>{name}</h3>
            </div>
        </>

    );
};

export default ContactCard;