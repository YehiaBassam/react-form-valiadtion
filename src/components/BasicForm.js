import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object().shape({
  firstName: yup.string().required("please enter first name"),
  lastName: yup.string().required("please enter last name"),
  email: yup.string().email("please enter valid email").required("required"),
  age: yup.number('must be number').positive().integer().min(10,"min 10 :)").max(99,"max 99 :)").required("required"),
  password: yup.string().min(5).max(10).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), "not match with password"]).required("required"),
})

const BasicForm = (props) => {
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  function login (data, e){
    console.log(data);
    e.target.reset(); 
  }
  
  return (
    <form onSubmit={handleSubmit(login)}>
      <h3 style={{ color: '#da0000' }}>React Hook Form Library</h3>
      <div className='control-group'>
        <div className={ errors.firstName ? "form-control invalid" : "form-control"}>
          <label htmlFor='name'>First Name</label>
          <input type='text' {...register('firstName')} />
          <p className="error-text"> { errors.firstName?.message } </p>
        </div>
        <div className={ errors.lastName ? "form-control invalid" : "form-control"}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' {...register('lastName')} />
          <p className="error-text"> { errors.lastName?.message } </p>
        </div>
        <div className={ errors.age ? "form-control invalid" : "form-control"}>
          <label htmlFor='age'>Age</label>
          <input type='text' {...register('age')} />
          <p className="error-text"> { errors.age?.message } </p>
        </div>
        <div className={ errors.email ? "form-control invalid" : "form-control"}>
          <label htmlFor='email'>Email</label>
          <input type='email' {...register('email')} />
          <p className="error-text"> { errors.email?.message } </p>
        </div>
        <div className={ errors.password ? "form-control invalid" : "form-control"}>
          <label htmlFor='password'>Password</label>
          <input type='password' {...register('password')} />
          <p className="error-text"> { errors.password?.message } </p>
        </div>
        <div className={ errors.confirmPassword ? "form-control invalid" : "form-control"}>
          <label htmlFor='confirm password'>Confirm Password</label>
          <input type='password' {...register('confirmPassword')} />
          <p className="error-text"> { errors.confirmPassword?.message } </p>
        </div>
      </div>

      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
