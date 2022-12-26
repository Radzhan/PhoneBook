import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ContactCard from '../../components/ContactCard/ContactCard';
import Window from '../../components/Window/Window';
import { allContacts, getContact } from '../../contact/contactSlice';

const Main = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(allContacts);

    const getContacts = useCallback(async () => {
        await dispatch(getContact());
    }, [dispatch]);

    useEffect(() => {
        getContacts().catch(console.error);
    }, [getContacts]);

    const createCard = contacts.map((item, index: number) => {
        return <ContactCard key={item.id} name={item.name} image={item.image} index={index}/>;
    });
    return (
        <div>
            {createCard}
            <Window/>
        </div>
    );
};

export default Main;