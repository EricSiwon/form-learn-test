import React from "react";

// https://jaredpalmer.com/formik/
import { Formik, Form, Field, useField, FieldArray } from "formik";

// https://material-ui.com/fr/customization/theming/
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  makeStyles
} from "@material-ui/core/styles";

// https://material-ui.com/fr/customization/color/
import { blue, red, orange, yellow, pink } from "@material-ui/core/colors";

// https://material-ui.com/fr/getting-started/installation/
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  MenuItem,
  Select
} from "@material-ui/core";

// https://github.com/jquense/yup
import * as Yup from "yup";

import "./reset.css";
import "./App.css";

// intégration de render material-ui
/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */
const MyRadio = ({ ...props }) => {
  const [field] = useField(props);
  // console.log(" MyRadio field", field, "MyRadio props", props);
  return <FormControlLabel {...field} {...props} control={<Radio />} />;
};

const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  //Gestion des errors
  const errorText = meta.error && meta.touched ? meta.error : "";
  // console.log(
  //   "MyTextField field",
  //   field,
  //   "MyTextField meta",
  //   meta,
  //   "MyTextField props",
  //   props
  // );
  return (
    <TextField
      variant="outlined"
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

// Controle de la saisie
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("Nom Obligatoire")
    .max(10, "Max 10 carractéres")
});

// typography.  global value
const myTheme = createMuiTheme({
  typography: {
    fontSize: 15,
    fontFamily: "-apple-system"
  },
  palette: {
    primary: orange,
    type: "dark" //Ecriture en blanc, choisir une couleur de fond foncée
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: pink[500],
        "&:hover": { backgroundColor: "green" }
      }
    }
  }
});

const myStyles = {
  myButtonOneClassName: {
    backgroundColor: "blue"
  }
};

const useMyStyle = makeStyles({
  myButtonTwoClassName: {
    backgroundColor: "red"
  }
});

function FormTest(props) {
  const { classes } = props;
  const myClasses = useMyStyle();
  return (
    <div className="App">
      <div>
        <Button className={classes.myButtonOneClassName} variant="contained">
          Button variant="contained"
        </Button>
      </div>

      <br />

      <div>
        <Button
          className={myClasses.myButtonTwoClassName}
          variant="contained"
          disableElevation
        >
          Button variant="contained" disableElevation
        </Button>
      </div>

      <br />

      <MuiThemeProvider theme={myTheme}>
        <div>
          <Button
            className={classes.myButtonOneClassName}
            color="primary"
            disableElevation
          >
            Hello custom primary color button
          </Button>
        </div>
        <div>
          <Button>Hello custom button</Button>
        </div>
      </MuiThemeProvider>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          dessert: "",
          dessertLabel: "",
          comments: [
            {
              title: "one",
              content: "nothink",
              id: "" + Math.floor(Math.random() * 1000 + 1)
            }
          ],
          menuderoulant: ""
        }}
        // Controle de la saisie
        validationSchema={validationSchema}
        //
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          // Make async call
          console.log("Submit", data);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {/* Form et Field remplace : form et TextField
            {({ values, isSubmitting, handelChange, handelBlur }) => (
              <form>
                <TextField
                  name="firstname"
                  value={values.firsname}
                  onChange={handelChange}
                  onBlur={handelBlur}
                />
              </form>
            )} */}

            {/* Mise en place de deux champs de saisie
            as point sur le TextField de material-ui */}
            <div>
              <Field
                placeholder="Prénom"
                name="firstName"
                type="input"
                as={TextField}
              />
            </div>

            <div>
              <Field
                placeholder="Nom"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>

            {/* Champ de saisie avec controle de la saisie */}
            <div>
              <MyTextField placeholder="Prénom" name="firstName" type="input" />
            </div>

            <div>
              <MyTextField placeholder="Nom" name="lastName" type="input" />
            </div>

            {/* Mise en place d"une checkbox 
                as pointe sur la checkbox de material-ui*/}
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <span>Accept</span>

            <div>Multi check box</div>
            {/* Mise en place d"une multi choise checkbox
                LE name est important, c'est la réference sur le tableau 
                as pointe sur la checkbox de material-ui*/}
            <Field
              name="cookies"
              type="checkbox"
              value="Choix 1"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="Choix 2"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="Choix 3"
              as={Checkbox}
            />

            <div>Mono check box</div>
            {/* Mise en place d"un mono choise radio
                LE name est important, c'est la réference sur le tableau 
                as pointe sur la checkbox de material-ui*/}
            <Field name="dessert" type="radio" value="Choix 1" as={Radio} />
            <Field name="dessert" type="radio" value="Choix 2" as={Radio} />
            <Field name="dessert" type="radio" value="Choix 3" as={Radio} />

            <div>Mono check box avec label </div>
            {/* Mise en place d"un mono choise radio
                LE name est important, c'est la réference sur le tableau 
                as pointe sur la checkbox de material-ui*/}
            <MyRadio
              name="dessertLabel"
              type="radio"
              value="Choix 1"
              label="Choix 1"
            />
            <MyRadio
              name="dessertLabel"
              type="radio"
              value="Choix 2"
              label="Choix 2"
            />
            <MyRadio
              name="dessertLabel"
              type="radio"
              value="Choix 3"
              label="Choix 3"
            />

            {/* Gestion tableau avec ajout element*/}
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
                  >
                    Add Paragraphe
                  </Button>
                  {values.comments.map((comment, index) => {
                    return (
                      <div key={comment.id}>
                        {/* <div>{comment.title}</div>
                        <div>{comment.content}</div> */}
                        <MyTextField
                          placeholder="title"
                          name={`comments.${index}.title`}
                        />
                        <MyTextField
                          placeholder="paragraphe"
                          name={`comments.${index}.content`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            {/* liste deroulante */}
            <Field name="menuderoulant" type="select" as={Select}>
              <MenuItem value="one">one</MenuItem>
              <MenuItem value="two">two</MenuItem>
              <MenuItem value="tree">tree</MenuItem>
            </Field>

            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            {/* Permet un debug des infos */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// export default App;
export default withStyles(myStyles)(FormTest);
