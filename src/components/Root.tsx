import { useState } from 'react';
import { CodeUploadForm } from './CodeUploadForm';
import { RegisterForm } from './RegisterForm';
import { CodeUploadContext } from '../context/CodeUploadContext';
import { ResultCodeWon } from './ResultCodeWon';
import { ResultCodeDidntWin } from './ResultCodeDidntWin';
import { CodeUploadData } from '../api/types';

export type formTypes = "codeUpload" | "registerUser" | "resultCodeWon" | "resultCodeDidntWin";

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

      {(form === "resultCodeWon") &&
        <ResultCodeWon />
      }

      {(form === "resultCodeDidntWin") &&
        <ResultCodeDidntWin/>
      }
    </CodeUploadContext.Provider>
  );
}
