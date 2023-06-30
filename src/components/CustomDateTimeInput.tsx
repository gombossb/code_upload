import { Field, FieldProps } from "formik";

const mapMonthToHungarianText = (month: number /*1-12*/) => {
  const months: {[key: number]: string} = {
    1: "január",
    2: "február",
    3: "március",
    4: "április",
    5: "május",
    6: "június",
    7: "július",
    8: "augusztus",
    9: "szeptember",
    10: "október",
    11: "november",
    12: "december"
  };

  return months[month];
}

const pad2 = (x: number) => x.toString().padStart(2, '0');

const changeDate = (t: string, d: string) => {
  return `${ t.slice(0, 5) }${ d }${ t.slice(10) }`;
}

const changeHour = (t: string, h: string) => {
  return `${ t.slice(0, 11) }${ h }${ t.slice(13) }`;
}

const changeMinute = (t: string, m: string) => {
  return `${ t.slice(0, 14) }${ m }`;
}

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

export const getDefaultDateValue = () => `${ pad2(today.getMonth() + 1) }-${ pad2(today.getDate()) }`;

export const getDefaultDateTimeValue = () => `${ today.getFullYear() }-${ getDefaultDateValue() } 00:00`;

export const CustomDateTimeInput = ({minDate, maxDate, name}: {
  minDate: Date,
  maxDate: Date,
  name: string,
}) => {
  if (maxDate < minDate){
    return "Date range error";
  }

  const days: {
    day: string, // MM-DD format
    displayedText: string, // eg. július 1.
    isInFuture: boolean,
  }[] = [];

  const tmpDate = new Date(minDate);
  while (tmpDate <= maxDate){
    days.push({
      day: `${ pad2(tmpDate.getMonth() + 1) }-${ pad2(tmpDate.getDate()) }`,
      displayedText: `${ mapMonthToHungarianText(tmpDate.getMonth() + 1) } ${ tmpDate.getDate() }.`,
      isInFuture: tmpDate > today,
    });
    tmpDate.setDate(tmpDate.getDate() + 1);
  }

  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <>
          <label className="block">Vásárlás dátuma</label>

          <div className="grid grid-cols-3">
            <div>
              <label className="block">Nap:</label>
              <select
                onChange={(e) => {
                  form.setFieldValue(field.name, changeDate(field.value, e.target.value));
                }}
                onBlur={field.onBlur(name)}
                defaultValue={getDefaultDateValue()}
              >
                {days.map(day => (
                  <option
                    value={day.day}
                    key={day.day}
                    disabled={day.isInFuture}
                  >
                    {day.displayedText}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block">Óra:</label>
              <select
                required
                onChange={(e) => {
                  form.setFieldValue(field.name, changeHour(field.value, e.target.value));
                }}
                onBlur={field.onBlur(name)}
                defaultValue=""
              >
                <option label=" " disabled></option>
                {Array(24).fill(0).map((_, i) => {
                  return <option value={ pad2(i) } key={ pad2(i) }>{ i }</option>
                })}
              </select>
            </div>

            <div>
              <label className="block">Perc:</label>
              <select
                required
                onChange={(e) => {
                  form.setFieldValue(field.name, changeMinute(field.value, e.target.value));
                  form.setTouched({"purchase_time": true})
                }}
                onBlur={field.onBlur(name)}
                defaultValue=""
              >
                <option label=" " disabled></option>
                {Array(60).fill(0).map((_, i) => {
                  return <option value={ pad2(i) } key={ pad2(i) }>{ i }</option>
                })}
              </select>
            </div>
          </div>

          {meta.touched && meta.error &&
            <span className="text-red-700">
              {meta.error}
            </span>
          }
        </>
      )}
    </Field>
  );
}
