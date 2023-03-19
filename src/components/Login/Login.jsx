import React from "react";
// import {  reduxForm, submit } from 'redux-form';
import {
  validateEmailField,
  ErrorMessageWrapper,
} from "../../utils/validators";
import style from "../../utils/ErrorMessage.module.css";
// import { Input } from '../common/FormsControl/FormControl';
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { Navigate } from "react-router-dom";

const LoginPage = (props) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Must be longer than 2 characters")
      .max(15, "Must be shorter than 15 characters")
      .required("Required 2"),
  });
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h2> Login page </h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
          general: "",
        }}
        validate={validateEmailField}
        validationSchema={validationSchema}
        onSubmit={(values, bagWithMethods) => {
          let { setStatus, setFieldValue, setSubmitting } = bagWithMethods;
          props.login(
            values.email,
            values.password,
            values.rememberMe,
            setStatus,
            setFieldValue,
            setSubmitting
          );
        }}
      >
        {(props) => {
          let { status, values, isSubmitting } = props;
          // console.log( status );
          // console.log( props.values, 'values');
          // console.log(props.isSubmitting, 'isSubmitting');
          console.log('props', props)
          return (
            <form onSubmit={props.handleSubmit}>
              <div>
                {values.general && (
                  <div>_.{values.general} - with setFieldValue</div>
                )}
                {status && (
                  <div className={style.validationErrorMessage}>
                    ..{status} - with setStatus
                  </div>
                )}
                <div>
                  <Field name={"email"} type={"text"} placeholder={"e-mail"} />
                </div>
                <ErrorMessage name="email">{ErrorMessageWrapper}</ErrorMessage>
                <div>
                  <Field
                    name={"password"}
                    type={"password"}
                    placeholder={"password"}
                  />
                </div>
                <ErrorMessage name="password">
                  {ErrorMessageWrapper}
                </ErrorMessage>
                <div>
                  <Field
                    type={"checkbox"}
                    name={"rememberMe"}
                    id="rememberMe"
                  />
                  <label htmlFor={"rememberMe"}> remember me </label>
                </div>
                <button type={"submit"} disabled={isSubmitting}>
                  {isSubmitting ? "Please wait..." : "Submit"}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

const LoginPageConnect = connect(mapStateToProps, {login})(LoginPage);

export default LoginPageConnect;

// const LoginForm = (props) => {
//   return (
//       <form onSubmit={props.handleSubmit}>
//         <div>
//           <Field name={'login'}
//           placeholder={'Login'}
//           validate={[required]}
//           component={Input}/>
//         </div>
//         <div> <Field name={'password'}
//         placeholder={'Password'}
//         validate={[required]}
//         component={Input}
//         type={"password"}/></div>
//         <div><Field name={'remember me'}
//         component={Input}
//         type={'checkbox'}/> remember me</div>
//         <button type={'submit'}>Login</button>
//       </form>
//   );
// }

// const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

// const Login = (props)=>{
//   const onSubmit = (formData) => {
//     props.login(formData.email, formData.password, formData.rememberMe)

//   }
//   return <div>
//     <h1>Login</h1>
//     <LoginReduxForm onSubmit={onsubmit}/>
//   </div>
// }
// export default connect (null, { login })(Login) ;
