
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CustomDateTimeInput, getDefaultDateTimeValue } from "./CustomDateTimeInput"
import * as Yup from 'yup';
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { formTypes } from "./Root";
import { CodeUploadContext } from "../context/CodeUploadContext";
import { apiUploadCode } from "../api/codeUpload";
import { CodeUploadError } from "../api/types";


export const CodeUploadForm = ({setForm}: {
  setForm: Dispatch<SetStateAction<formTypes>>
}) => {
  const { setCodeUploadData } = useContext(CodeUploadContext);
  const [apiError, setApiError] = useState("");

  return (
    <Formik
      initialValues={{ email: "", code: "", purchase_time: getDefaultDateTimeValue() }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Érvénytelen email cím!')
          .required('Nincs megadott email!'),
        code: Yup.string()
          .min(8, '8 karakter hosszúnak kell lennie!')
          .max(8, '8 karakter hosszúnak kell lennie!')
          .matches(/[a-zA-Z0-9]{8}/, 'Érvénytelen karaktert tartalmaz!')
          .required('Nincs megadott kód!'),
        // purchaseTime: Yup.string()
        //   .test(
        //     "futureTest",
        //     "A megadott idő nem lehet jövőbeli!",
        //     value => new Date(value as string) <= new Date()
          // )
      })}
      onSubmit={(values) => {
        if (new Date(values.purchase_time as string) > new Date()){
          setApiError("A megadott idő nem lehet jövőbeli!");
          return;
        }

        setApiError("");

        setCodeUploadData({
          email: values.email,
          code: values.code,
          purchase_time: values.purchase_time
        });
        
        apiUploadCode(
          values,
          async (response) => {
            if (response.data?.data?.success){
              setForm((response.data?.data?.won) ? "resultCodeWon" : "resultCodeDidntWin");
            } else {
              setApiError("API hiba");
            }
          },
          async (error) => {
            if (error.response?.data){
              const errorData = error.response?.data as CodeUploadError;
              let emailNotFound = false;
              let otherError = false;

              errorData.errors.forEach(e => {
                if (e.code === "email:not_found")
                  emailNotFound = true;
                else
                  otherError = true;
              });

              if (emailNotFound && !otherError)
                setForm("registerUser");
              else
              setApiError("API hiba");
            } else {
              setApiError("API hiba");
            }
          }
        );
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
            name="purchase_time"
          />
        </div>

        <div className="my-3 text-red-700">
          {apiError}
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
