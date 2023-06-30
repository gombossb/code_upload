import { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { formTypes } from "./Root";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import * as Yup from 'yup';
import { CodeUploadContext } from "../context/CodeUploadContext";
import { apiRegisterUser } from "../api/registerUser";
import { apiUploadCode } from "../api/codeUpload";
import { CodeUploadData } from "../api/types";

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
  const { codeUploadData } = useContext(CodeUploadContext);
  const [apiError, setApiError] = useState("");

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
      onSubmit={(values) => {
        apiRegisterUser(
          {
            email: codeUploadData?.email as string,
            name: values.name
          },
          async (registerResponse) => {
            if (registerResponse.data?.data?.success){
              apiUploadCode(
                codeUploadData as CodeUploadData,
                async (codeResponse) => {
                  if (codeResponse.data?.data?.success){
                    setForm((codeResponse.data?.data?.won) ? "resultCodeWon" : "resultCodeDidntWin");
                  } else {
                    setApiError("API hiba");
                  }
                },
                async () => {
                  setApiError("API hiba");
                }
              );
            } else {
              setApiError("API hiba");
            }
          },
          async (registerError) => {
            if (registerError.response?.data){
              setApiError("Sikertelen regisztráció!");
            } else {
              setApiError("API hiba");
            }
          }
        );
      }}
    >
      <Form>
        <h1 className="text-4xl text-center my-9">Regisztráció</h1>

        <p className="text-sm">
          Mivel még nem létezik fiókod rendszerünkben, ezért a kód beküldéséhez regisztrálnod kell. Ehhez a nevedet kell megadnod és el kell fogadnod a játékszabályzatot. A Regisztráció gomb megnyomásával regisztrálunk rendszerünkbe, majd a korábban megadott kódra megnézzük, hogy nyertél-e vele.
        </p>

        <div className="my-3">
          <label htmlFor="email">E-mail:</label>
          <Field
            name="email"
            type="email"
            disabled
            className="block border-solid border-2 border-black p-1 active:rounded-none text-slate-500"
          />
          <span className="text-red-700">
            <ErrorMessage name="email" />
          </span>
        </div>

        <div className="my-3">
          <label htmlFor="email">Név:</label>
          <Field
            name="name"
            type="name"
            autoFocus
            className="block border-solid border-2 border-black p-1 active:rounded-none"
          />
          <span className="text-red-700">
            <ErrorMessage name="name" />
          </span>
        </div>

        <div className="my-3">
          <CustomCheckbox name="acceptedTOS" className="m-2">
            Elolvastam és elfogadom a játékszabályzatot.
          </CustomCheckbox>
        </div>

        <div className="my-3 text-red-700">
          {apiError}
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
