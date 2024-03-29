import React from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/contact';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {  changeClass, deleteContact, getContact } from '../../contact/contactSlice';
import './Window.css'


const Window: React.FC = () => {
    const className = useAppSelector((state: RootState) => state.contact.display);
    const contact = useAppSelector((state: RootState) => state.contact.contact);
    const onDelete = useAppSelector((state: RootState) => state.contact.onDelete);

    const dispatch = useAppDispatch();

    const remove = async (id: string) => {
        await dispatch(deleteContact(id))
        await dispatch(getContact())
        await dispatch(changeClass());
    }

    return (
        <div style={{ position: 'absolute', top: '25%', left: '25%', border: '1px solid black',}} className={className}>
            <div className='d-flex align-items-center'>
                <img src={contact.image} alt="Person" style={{ width: '10rem', height: '10rem' }} className='me-2' />
                <div>
                    <h3>{contact.name}</h3>
                    <h5>{contact.phone}</h5>
                    <h5>{contact.email}</h5>
                <Link to={'/edit/' + contact.id} className='btn btn-primary me-2'>{onDelete ? 'loading...' : 'Edit'}</Link>
                <button className='btn btn-danger' onClick={() => remove(contact.id)} disabled={onDelete}>{onDelete ? 'loading...' : 'Delete'}</button>
                </div>
            </div>
        </div>
    );
};

export default Window;