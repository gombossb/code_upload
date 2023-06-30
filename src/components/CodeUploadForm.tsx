
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CustomDateTimeInput } from "./CustomDateTimeInput"
import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { formTypes } from "./Root";
import { CodeUploadContext } from "../context/CodeUploadContext";
import { apiUploadCode } from "../api/codeUpload";


export const CodeUploadForm = ({setForm}: {
  setForm: Dispatch<SetStateAction<formTypes>>
}) => {
  const { codeUploadData, setCodeUploadData } = useContext(CodeUploadContext);

  return (
    <Formik
      initialValues={{ email: "", code: "", purchaseDate: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Érvénytelen email cím!')
          .required('Nincs megadott email!'),
        code: Yup.string()
          .min(8, '8 karakter hosszúnak kell lennie!')
          .max(8, '8 karakter hosszúnak kell lennie!')
          .matches(/[a-zA-Z0-9]{8}/, 'Érvénytelen karaktert tartalmaz!')
          .required('Nincs megadott kód!'),
        // purchaseDate: Yup.string() // todo
        //   .max(20, 'Must be 20 characters or less')
        //   .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setCodeUploadData({
          email: values.email,
          code: values.code,
          purchaseDate: values.purchaseDate,
          name: ""
        });
        apiUploadCode(codeUploadData,
          async (r) => console.log(r),
          async (r) => console.log(r)
        );
        console.log(values)
        // todo send code post
        // if not regged:
        setForm("registerUser") // and after regging send again
        // else handle win message
        // setSubmitting(false)
      }}
    >
      <Form>
        <h1 className="text-4xl text-center my-9">Kódfeltöltés</h1>

        <div className="my-3">
          <label htmlFor="email">E-mail:</label>
          <Field
            name="email"
            type="email"
            className="block border-solid border-2 border-black p-1 active:rounded-none"
          />
          <span className="text-red-700">
            <ErrorMessage name="email" />
          </span>
        </div>

        <div className="my-3">
          <label htmlFor="code">Kód:</label>
          <Field
            name="code"
            type="code"
            className="block border-solid border-2 border-black p-1 active:rounded-none"
          />
          <span className="text-red-700">
            <ErrorMessage name="code" />
          </span>
        </div>

        <div className="my-3">
          <CustomDateTimeInput
            minDate={new Date("2023-06-01")} // local
            maxDate={new Date("2023-08-31")} // local
            date=""
            setDate={() => {}}
          />
        </div>

        <button
          type="submit"
          className="mx-auto block bg-slate-600 p-3 text-white"
        >
          Kódfeltöltés
        </button>
      </Form>
    </Formik>
  );
}
