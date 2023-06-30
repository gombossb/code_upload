import { useState } from 'react';
import { CodeUploadForm } from './CodeUploadForm';
import { RegisterForm } from './RegisterForm';
import { CodeUploadContext, CodeUploadData } from '../context/CodeUploadContext';

export type formTypes = "codeUpload" | "registerUser";

export const Root = () => {
  const [codeUploadData, setCodeUploadData] = useState<CodeUploadData>();
  const [form, setForm] = useState<formTypes>("codeUpload");
  return (
    <CodeUploadContext.Provider value={{ codeUploadData, setCodeUploadData }}>
      {(form === "codeUpload") &&
        <CodeUploadForm
          setForm={setForm}
        />
      }
      {(form === "registerUser") &&
        <RegisterForm
          setForm={setForm}
        />
      }
    </CodeUploadContext.Provider>
  );
}
