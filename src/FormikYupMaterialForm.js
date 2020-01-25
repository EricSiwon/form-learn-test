import React, { useState } from "react";

import "./FormikYupMaterialForm.css";

// https://jaredpalmer.com/formik/
import {
  Formik,
  Form,
  Field,
  useField,
  FieldArray,
  ErrorMessage
} from "formik";

// https://material-ui.com/fr/getting-started/installation/
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControl,
  InputLabel,
  FormControlLabel,
  MenuItem,
  Select
} from "@material-ui/core";

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
    .required("Must enter a email"),
  isAccepted: Yup.boolean().required("Must be accepted"),
  multiChoice: Yup.array()
    .min(1, "Make one choice")
    .required("Make one choice"),
  selectChoice: Yup.string().required("Select one choice"),
  menuderoulant: Yup.string().required("Select an choice")
});
// ----------------------------------------------------------

// My Selection Material-UI ---------------------------------
const MyInputTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      {...props}
      size="small"
      //   required // put a start after the label or defaultValue if no empty
      // label="required"
      // defaultValue="Enter your name"
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const MyCheckbox = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <>
      {/* <pre>{errorText}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre> */}
      {/* <ErrorMessage name={props.name}>
        {msg => <span style={{ color: "red" }}>{msg}</span>}
      </ErrorMessage> */}
      <ErrorMessage
        component="span"
        name={props.name}
        style={{ color: "red" }}
      />
      <FormControlLabel
        {...field}
        {...props}
        label={props.label}
        control={<Checkbox />}
      />
    </>
  );
};

const MyRadio = ({ ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} {...props} control={<Radio />} />;
};

// ----------------------------------------------------------

export default function FromikYupMaterialForm() {
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
      <h1>Formik + Yup + Material-UI</h1>
      <hr />
      {/* // Declaration Variables Functions ---------------------- */}
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          isAccepted: false,
          multiChoice: [],
          selectedChoice: "",
          comments: [
            {
              title: "",
              content: "",
              id: "" + Math.floor(Math.random() * 1000 + 1)
            }
          ],
          menuderoulant: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // Make async call
          setTimeout(() => {
            alert(JSON.stringify(data, null, 2));
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
                <hr />
                <br />
              </div>
            ) : null}
            {/* // My TextField Material-UI ------------------------- */}
            <div>
              <MyInputTextField
                name="firstName"
                type="input"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <MyInputTextField
                placeholder="Enter your email"
                name="email"
                type="input"
              />
            </div>
            <hr />
            <div>
              <MyInputTextField
                name="firstName"
                type="input"
                placeholder="Enter your name"
                variant="outlined"
              />
              <MyInputTextField
                placeholder="Enter your email"
                name="email"
                type="input"
                variant="outlined"
              />
            </div>
            <hr />
            {/* // My Checkbox Material-UI ------------------------- */}
            <MyCheckbox
              value="Choice1"
              name="multiChoice"
              label="Choice1"
              labelPlacement="top"
            />
            <MyCheckbox
              value="Choice2"
              name="multiChoice"
              label="Choice2"
              labelPlacement="top"
            />
            <MyCheckbox
              value="Choice3"
              name="multiChoice"
              label="Choice3"
              labelPlacement="top"
            />

            <hr />
            <span>Make a Choice</span>
            {/* // My Radio Material-UI ------------------------- */}
            <MyRadio
              type="radio"
              value="5"
              name="selectedChoice"
              label="5"
              labelPlacement="start"
            />
            <MyRadio
              type="radio"
              value="10"
              name="selectedChoice"
              label="10"
              labelPlacement="start"
            />
            <MyRadio
              type="radio"
              value="15"
              name="selectedChoice"
              label="15"
              labelPlacement="start"
            />

            <hr />
            {/* // My FieldArray Material-UI ------------------------- */}
            <FieldArray name="comments">
              {arrayHelpers => (
                <div>
                  <Button
                    onClick={() => {
                      arrayHelpers.push({
                        title: "",
                        content: "",
                        id: "" + Math.floor(Math.random() * 1000 + 1)
                      });
                    }}
                    variant="contained"
                  >
                    Add Comment
                  </Button>
                  {values.comments.map((comment, index) => {
                    return (
                      <div key={comment.id}>
                        <div>
                          <TextField
                            placeholder="title"
                            name={comment.title}
                            variant="outlined"
                            size="small"
                          />
                        </div>
                        <div>
                          <TextField
                            placeholder="paragraphe"
                            name={comment.content}
                            variant="outlined"
                            fullWidth
                            multiline="true"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <hr />
            {/* // My Select Material-UI ------------------------- */}

            <ErrorMessage
              component="div"
              name="menuderoulant"
              style={{ color: "red" }}
            />
            <FormControl style={{ minWidth: 125 }}>
              <InputLabel>Faire un choix</InputLabel>

              <Field
                name="menuderoulant"
                type="select"
                as={Select}
                placeholder="Choice"
              >
                <MenuItem value="one">one</MenuItem>
                <MenuItem value="two">two</MenuItem>
                <MenuItem value="tree">tree</MenuItem>
                <MenuItem value="four">blablabla</MenuItem>
              </Field>
            </FormControl>

            <hr />
            <div>
              <MyCheckbox
                name="isAccepted"
                value={values.isAccepted}
                color="primary"
                label="Accepter Les Conditions Generales"
                labelPlacement="end"
              />
              {!values.isAccepted && touched.isAccepted ? (
                <span>Merci d'accepter Les Conditions Generales</span>
              ) : null}
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
