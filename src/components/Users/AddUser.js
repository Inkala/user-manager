import React, { useState, useRef } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please check the information. Fields cannot be empty.',
      });
      return;
    }
    if (+enteredAge < 0) {
      setError({
        title: 'Invalid age',
        message: 'Age cannot be a negative number',
      });
      return;
    }
    props.onAddUser({
      name: enteredName,
      age: enteredAge,
      id: Math.random(),
    });
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const closeModalHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={closeModalHandler}
        />
      )}
    </Wrapper>
  );
};

export default AddUser;
