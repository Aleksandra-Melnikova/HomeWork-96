import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectRegisterError, selectRegisterLoading } from "./UserSlice.ts";

import { NavLink } from "react-router-dom";
import { register } from "./UserThunk.ts";
import { RegisterMutation } from '../../types';
import ButtonLoading from '../../components/UI/UI/ButtonLoading/ButtonLoading.tsx';
import FileInput from '../../components/FileInput/FileInput.tsx';


const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
   email: "",
    password: "",
    displayName: "",
   image: null,
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log(form);
      await dispatch(register(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: RegisterMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="container-fluid">

      <div className="col-md-7 col-sm-10 col-xl-7 offset-md-4 mx-auto">
        <div className="form-container">
          <div className="form-icon"><i className="fa fa-user"></i></div>
          <h3 className="title">Register</h3>
          <form className="form-horizontal" onSubmit={submitFormHandler}>
            <div className="form-group">
              {getFieldError('email') ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError('email')}
                </div>
              ) : null}
              <input
                type="text"
                id="email"
                className={
                  getFieldError('email')
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={inputChangeHandler}
                value={form.email}
                name="email"
              />
              <label>email</label>

            </div>
            <div className="form-group">
              {getFieldError('displayName') ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError('displayName')}
                </div>
              ) : null}
              <input
                type="text"
                id="displayName"
                className={
                  getFieldError('displayName')
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={inputChangeHandler}
                value={form.displayName}
                name="displayName"
              />
              <label>Your name</label>
            </div>
            <div className="form-group">
              {getFieldError('password') ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError('password')}
                </div>
              ) : null}
              <input
                type="password"
                id="password"
                className={
                  getFieldError('password')
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={inputChangeHandler}
                value={form.password}
                name="password"
              />
              <label>password</label>
            </div>
            <FileInput
              id="image"
              name="image"
              label="Avatar"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control`}
            />

  <ButtonLoading
                        type="submit"
                        text={" Sign up"}
                        isLoading={loading}
                        isDisabled={loading}
                      ></ButtonLoading>

            <NavLink
              to={'/login'}
              className={'d-block text-center mt-3 form-link-nav'}
            >
              Already have an account?<br/> Sign in
            </NavLink>
          </form>
        </div>
      </div>

    </div>
    // <section className="vh-700 mt-2">
    //   <div className="container h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col-lg-12 col-xl-11">
    //         <div className="card text-black ">
    //           <div className="card-body p-md-5">
    //             <div className="row justify-content-center">
    //               <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    //                 <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">
    //                   Sign up
    //                 </p>
    //
    //                 <form
    //                   className="mx-1 mx-md-4"
    //                   onSubmit={submitFormHandler}
    //                 >
    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       {getFieldError("username") ? (
    //                         <div
    //                           className="alert alert-danger w-100 text-center p-1 mx-auto"
    //                           role="alert"
    //                         >
    //                           {getFieldError("username")}
    //                         </div>
    //                       ) : null}
    //                       <input
    //                         type="text"
    //                         id="username"
    //                         className={
    //                           getFieldError("username")
    //                             ? "form-control is-invalid"
    //                             : "form-control"
    //                         }
    //                         onChange={inputChangeHandler}
    //                         value={form.username}
    //                         name="username"
    //                       />
    //                       <label className="form-label" htmlFor={"username"}>
    //                         Username
    //                       </label>
    //                     </div>
    //                   </div>
    //
    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       {getFieldError("password") ? (
    //                         <div
    //                           className="alert alert-danger w-100 text-center p-1 mx-auto"
    //                           role="alert"
    //                         >
    //                           {getFieldError("password")}
    //                         </div>
    //                       ) : null}
    //                       <input
    //                         type="password"
    //                         id="password"
    //                         className={
    //                           getFieldError("password")
    //                             ? "form-control is-invalid"
    //                             : "form-control"
    //                         }
    //                         onChange={inputChangeHandler}
    //                         value={form.password}
    //                         name="password"
    //                       />
    //                       <label htmlFor={"password"} className="form-label">
    //                         Password
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       {getFieldError("displayName") ? (
    //                         <div
    //                           className="alert alert-danger w-100 text-center p-1 mx-auto"
    //                           role="alert"
    //                         >
    //                           {getFieldError("displayName")}
    //                         </div>
    //                       ) : null}
    //                       <input
    //                         type="text"
    //                         id="username"
    //                         className={
    //                           getFieldError("displayName")
    //                             ? "form-control is-invalid"
    //                             : "form-control"
    //                         }
    //                         onChange={inputChangeHandler}
    //                         value={form.displayName}
    //                         name="displayName"
    //                       />
    //                       <label
    //                         className="form-label"
    //                         htmlFor={"displayName"}
    //                       >
    //                         Your salesman name
    //                       </label>
    //                     </div>
    //                   </div>
    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       {getFieldError("phoneNumber") ? (
    //                         <div
    //                           className="alert alert-danger w-100 text-center p-1 mx-auto"
    //                           role="alert"
    //                         >
    //                           {getFieldError("phoneNumber")}
    //                         </div>
    //                       ) : null}
    //                       <input
    //                         type="text"
    //                         id="phoneNumber"
    //                         className={
    //                           getFieldError("phoneNumber")
    //                             ? "form-control is-invalid"
    //                             : "form-control"
    //                         }
    //                         onChange={inputChangeHandler}
    //                         value={form.phoneNumber}
    //                         name="phoneNumber"
    //                       />
    //                       <label
    //                         className="form-label"
    //                         htmlFor={"phoneNumber"}
    //                       >
    //                         Phone number
    //                       </label>
    //                     </div>
    //                   </div>
    //
    //                   <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
    //                     <ButtonLoading
    //                       type="submit"
    //                       text={" Sign up"}
    //                       isLoading={loading}
    //                       isDisabled={loading}
    //                     ></ButtonLoading>
    //                   </div>
    //                   <NavLink
    //                     to={"/login"}
    //                     className={"d-block text-center"}
    //                   >
    //                     Already have an account? Sign in
    //                   </NavLink>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};
export default Register;

