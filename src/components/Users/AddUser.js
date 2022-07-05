import React, { useState } from 'react';
import Button from '../UI/Button';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();
    if (!usernameIsValid() || !ageIsValid()) {
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
      name: enteredUsername,
      age: enteredAge,
      id: Math.random(),
    });
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const closeModalHandler = () => {
    setError(null);
  };

  const usernameIsValid = () => enteredUsername.trim().length > 0;
  const ageIsValid = () => enteredAge.trim().length > 0;

  return (
    <>
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={closeModalHandler}
        />
      )}
    </>
  );
};

export default AddUser;
