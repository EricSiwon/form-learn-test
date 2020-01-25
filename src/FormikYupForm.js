import React, { useState } from "react";

import "./FormikYupForm.css";

// https://jaredpalmer.com/formik/
import { Formik, Form, Field } from "formik";

// Ctrl Validation Inputs --------------------------------
// https://github.com/jquense/yup
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Must have a character")
    .max(255, "Must be shorter than 255")
    .required("Must enter a name"),
  email: Yup.string()
    .email("Must be a valid email adress")
    .min(1, "Must have a character")
    .max(255, "Must be shorter than 255")
    .required("Must enter a email")
});
// ----------------------------------------------------------

// Ctrl display message ---------------------------------
const Error = ({ touched, message }) => {
  if (!touched) {
    return <div></div>;
  }
  if (message) {
    return <div className="input-error">{message}</div>;
  }
  return <div className="input-valid">Valid</div>;
};
// ----------------------------------------------------------

export default function FromikYupForm() {
  const [debug, setDebug] = useState(false);
  return (
    <>
      <button
        className="debug-button"
        onClick={() => {
          setDebug(!debug);
        }}
      >
        Set Debug
      </button>
      <hr />
      <h1>Formik + Yup + Native form</h1>
      <hr />
      <Formik
        //    Declaration des inputs par default
        initialValues={{ firstName: "", email: "" }}
        //    Validation des inputs avec YUP
        validationSchema={validationSchema}
        // submit form, received values,setSubmitting and resetFrom function
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // Make async call
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {/* Syntaxe de base {( ...props... )=>( ...html...)} */}
        {/*  - values content all values  
             - errors content all errors  
             - touched is a state  
             - handleChange,handleBlur => function */}

        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Display data */}
            {debug ? (
              <div>
                <h2>values:</h2>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <h2>errors:</h2>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                <h2>touched:</h2>
                <pre>{JSON.stringify(touched, null, 2)}</pre>
                <h2>isSubmitting:</h2>
                <pre>{JSON.stringify(isSubmitting, null, 2)}</pre>
                <hr />
                <br />
              </div>
            ) : null}

            {/* Start here */}
            <div>
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                name="firstName"
                id="name"
                placeholder="Enter your name"
                // Get Formik
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                // Modification class name if the key exist in touched and errors object.
                className={
                  touched.firstName && errors.firstName ? "has-error" : null
                }
              />
              {/* Add message of validation input  props=touched and message*/}
              <Error touched={touched.firstName} message={errors.firstName} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                // Get Formik
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                // Modification class name if the key exist in touched and errors object.
                className={touched.email && errors.email ? "has-error" : null}
              />
              <Error touched={touched.email} message={errors.email} />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
      <br />
      <hr />
      <br />
      <h1>Formik + Yup + Formik Field</h1>
      <hr />
      <Formik
        initialValues={{ firstName: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // Make async call
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            {debug ? (
              <div>
                <h2>values:</h2>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <h2>errors:</h2>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                <h2>touched:</h2>
                <pre>{JSON.stringify(touched, null, 2)}</pre>
                <h2>isSubmitting:</h2>
                <pre>{JSON.stringify(isSubmitting, null, 2)}</pre>
                <hr />
                <br />
              </div>
            ) : null}

            <div>
              <label htmlFor="firstName">Name</label>
              <Field placeholder="Prénom" name="firstName" type="input" />
              <Error touched={touched.firstName} message={errors.firstName} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field placeholder="Mail" name="email" type="email" />
              <Error touched={touched.email} message={errors.email} />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
            <h2>All values:</h2>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
}
