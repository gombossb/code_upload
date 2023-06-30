import { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { formTypes } from "./Root";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import * as Yup from 'yup';
import { CodeUploadContext } from "../context/CodeUploadContext";

const CustomCheckbox = ({ name, children, ...props }: {
  name: string,
  children: ReactNode,
  [prop: string]: any
}) => {
  const [field, meta] = useField({ ...props, name: name, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} name={name} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-red-700">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export const RegisterForm = ({setForm}: {
  setForm: Dispatch<SetStateAction<formTypes>>
}) => {
  const { codeUploadData, setCodeUploadData } = useContext(CodeUploadContext);

  return (
    <Formik
      initialValues={{ email: codeUploadData?.email || "", name: "", acceptedTOS: false }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Érvénytelen email cím!')
          .required('Nincs megadott email!'),
        name: Yup.string()
          .min(5, 'Minimum 5 karakter hosszúnak kell lennie!')
          .required('Nincs megadott név!'),
        acceptedTOS: Yup.boolean()
        .required("Required")
        .oneOf([true], "El kell fogadnod a játékszabályzatot!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        // todo send registration
        // if success: upload code, display win message
        // else display error
      }}
    >
      <Form>
        <h1 className="text-4xl text-center my-9">Regisztráció</h1>

        <div className="my-3">
          <label htmlFor="email">E-mail:</label>
          <Field
            name="email"
            type="email"
            disabled
            className="block border-solid border-2 border-black p-1 active:rounded-none"
          />
          <span className="text-red-700">
            <ErrorMessage name="email" />
          </span>
        </div>

        <div className="my-3">
          <CustomCheckbox name="acceptedTOS">
            Elolvastam és elfogadom a játékszabályzatot.
          </CustomCheckbox>
        </div>

        <div className="my-3">
          
        </div>

        <button
          type="submit"
          className="mx-auto block bg-slate-600 p-3 text-white"
        >
          Regisztráció
        </button>
      </Form>
    </Formik>
  );
}
