import React, { useState,  useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "User_Input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "Input_Blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredCollegeName, setEnteredCollegeName] = useState("");
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(true);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  //const authCtx=useContext(Authenticate)

 /*  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Key stroke");
    }, 1000);

    return () => {
      console.log("Cleanup");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword, enteredCollegeName]); */

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_Input", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") &&
        enteredPassword.trim().length > 6 &&
        enteredCollegeName.trim().length > 0
    );
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);

    setFormIsValid(
      emailState.isValid &&
        enteredPassword.trim().length > 6 &&
        event.target.value.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollegeName.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_Blur" });
  };

  const validateCollegeNameHandler = () => {
    setCollegeNameIsValid(enteredCollegeName.trim().length > 0);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input 
       id="email" 
       label="E-mail"
       type= "text"  
       isValid={emailState} 
       value={emailState.value} 
       onChange={emailChangeHandler}
       onBlur={validateEmailHandler}
       />
         <Input 
       id="collegename" 
       label="College Name"
       type= "text"  
       isValid={collegeNameIsValid} 
       value={enteredCollegeName.value} 
       onChange={collegeNameChangeHandler}
       onBlur={validateCollegeNameHandler}
       />
       
        <Input 
       id="password" 
       label="Password"
       type= "password"  
       isValid={passwordIsValid} 
       value={enteredPassword.value} 
       onChange={passwordChangeHandler}
       onBlur={validatePasswordHandler}
       />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
