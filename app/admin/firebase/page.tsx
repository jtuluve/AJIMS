'use client'

import React, { useState } from 'react';
import '@css/firebase.css';
import Link from 'next/link';

const UserCrudPage = () => {

    const handleInputChange = (e:any) => {
        //CODE HERE
    };

    const handleSubmit = (e:any) => {
        //CODE HERE
    };

    const handleEdit = (index:any) => {
       //CODE HERE
    };

    const handleDelete = (index:any) => {
        //CODE HERE
    };

    return (
        <section className="crudpage">
            <div className="titlebar">
                <img alt='logo' src="/logo.jpg" className="logo" />
                <a className="web-name">AJIMS Employment Management</a>
                <Link
                    title="home"
                    className="material-symbols-outlined home"
                    href={'/admin'}
                >
                    home
                </Link>
            </div>
            <div className="crud-container">
                <h2>User Management</h2>
                <form className="user-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <button type="submit">Add user</button>
                </form>
                {/** Table of the users displayed here whre you can edit or delete their creds or users*/}
            </div>
        </section>
    );
};

export default UserCrudPage;
