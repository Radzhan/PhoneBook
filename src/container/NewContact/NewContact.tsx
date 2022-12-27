import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../app/contact';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axiosApi from '../../axiosApi';
import { createContact , changingContact } from '../../contact/contactSlice';

let initialState = {
    name: '',
    phone: '',
    email: '',
    image: '',
};

const NewContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(initialState);
    const dispatch = useAppDispatch();
    const onDelete = useAppSelector((state: RootState) => state.contact.onDelete);


    const putContact = useCallback( async () => {
        const response = await axiosApi.get('/contacts/' + id + '.json');
        if (id !== undefined) {
            setContact({
                name: response.data.name,
                phone: response.data.phone,
                email: response.data.email,
                image: response.data.image,
            })
        }
    }, [id])

    useEffect(() => {
        putContact().catch(console.error)
    }, [putContact])

    const onDishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact(prev => ({ ...prev, [name]: value }));
    };
    
    const onFormSubmit = async (e: React.FormEvent) => {
        const forObject = {
            id: id!,
            item: contact,
        }
        e.preventDefault();
        if (id !== undefined) {
            await dispatch(changingContact(forObject))
        } else {
            await dispatch(createContact(contact));
        }
        navigate('/');
    };

    let onForm = (
        <form onSubmit={onFormSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" required className="form-control" name='name' id="inputName" value={contact.name} onChange={onDishChange} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" required className="form-control" name='phone' id="inputPhone" value={contact.phone} onChange={onDishChange} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name='email' id="inputEmail" value={contact.email} onChange={onDishChange} />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input type="url" className="form-control" id="inputPassword" name='image' value={contact.image} onChange={onDishChange} />
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <p className='col-sm-2 col-form-label'>Photo prewiew</p>
                    <img src={contact.image} alt="Person" style={{ width: '8rem', height: '8rem' }} className='form-control' />
                </div>

                <button type='submit' className='btn btn-primary me-3'>Save</button>
                <Link to='/' className='btn btn-success'>Back to contacts</Link>
            </form>
    )

    if (onDelete) {
        onForm =(
            <h1>loading...</h1>
        )
    }

    return (
        <div>
            {onForm}
        </div>
    );
};

export default NewContact;