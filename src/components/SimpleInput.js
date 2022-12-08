// import { useRef } from "react";
import { useState } from "react";

const SimpleInput = (props) => {
  // Ref Method (uncontroll method)
  // const userName = useRef();
  // const userEmail = useRef();

  // const handlingSubmit = (e) => {
  //   const userNameVal = userName.current.value;
  //   const userEmailVal = userEmail.current.value;
  //   e.preventDefault();
  //   if ( !userNameVal || !userEmailVal ){
  //     alert("please enter your name & email")
  //   } else {
  //     console.log(`user name: ${userNameVal} and email: ${userEmailVal}`);
  //     userName.current.value = userEmail.current.value = ''; // that isn't ideal beacuse we manipulate the dom directly >> not with react
  //   }
  // }
  
  // React Method (controll method)
  const loginForm = { userName: '', userEmail: '' };
  const isLoginError = { userName: false, userEmail: false };
  const [ formState, setFormState ] = useState(loginForm);
  const [ isFormError, setIsFormError ] = useState(isLoginError);
  // const [ isSubmitDisabled, setIsSubmitDisabled ] = useState(true);

  function handleChange(e){
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })

    if (!e.target.value.trim()){
      isErrorCheck(e, true);
    } else {
      isErrorCheck(e, false);
    }
  }
  
  function handleTouche(e){
    if (!e.target.value.trim()){
      isErrorCheck(e, true);
    }
  }
  
  function isErrorCheck(e, true_false){
    setIsFormError({
      ...isFormError,
      [e.target.id]: true_false
    })


    // if( !formState.userName || !formState.userEmail){
    //   setIsSubmitDisabled(true)
    // } else {
    //   setIsSubmitDisabled(false)
    // }
  }
  
  function handlingSubmit(e) {
    e.preventDefault();
    for (const key in formState) {
      if (!formState[key].trim()) {
        alert("please enter your name & email");
        // setIsSubmitDisabled(true)
        return
      }
    }
    console.log(`user name: ${formState.userName} and email: ${formState.userEmail}`);
    setFormState(loginForm) // Reset
  }

  return (
    <form onSubmit={handlingSubmit}>
      <h3 style={{color:'#da0000'}}>Regular React Form</h3>
      <div className={isFormError.userName ? "form-control invalid" : "form-control"}>
        <label htmlFor='name'>Your Name</label>
        {/* <input ref={userName} type='text' id='name' /> */}
        <input 
          type='text' 
          id='userName' 
          onChange={handleChange} 
          onBlur={handleTouche} 
          value={formState.userName}
        />
        { isFormError.userName && <p className="error-text">please enter the name</p>}
      </div>
      <div className={isFormError.userEmail ? "form-control invalid" : "form-control"}>
        <label htmlFor='email'>Your email</label>
        {/* <input ref={userEmail} type='email' id='email' /> */}
        <input 
          type='email'
          id='userEmail' 
          onChange={handleChange} 
          onBlur={handleTouche} 
          value={formState.userEmail}
        />
        { isFormError.userEmail && <p className="error-text">please enter the email</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
        {/* <button disabled={isSubmitDisabled}>Submit</button> */}
      </div>
    </form>
  );
};

export default SimpleInput;
