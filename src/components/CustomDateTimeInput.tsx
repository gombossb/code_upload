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

export const CustomDateTimeInput = ({minDate, maxDate, date, setDate}: {
  minDate: Date,
  maxDate: Date,
  date: string,
  setDate: () => any
}) => {
  if (maxDate < minDate){
    return "Date error";
  }

  const days: {
    day: string, // MM-DD format
    displayedText: string, // eg. július 1.
    isInFuture: boolean,
  }[] = [];

  const tmpDate = new Date(minDate);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  while (tmpDate <= maxDate){
    days.push({
      day: `${tmpDate.getUTCMonth() + 1}-${tmpDate.getUTCDate()}`,
      displayedText: `${mapMonthToHungarianText(tmpDate.getUTCMonth() + 1)} ${tmpDate.getUTCDate()}.`,
      isInFuture: tmpDate > today,
    });
    tmpDate.setDate(tmpDate.getDate() + 1);
  }

  return (
    <>
      <label className="block">Vásárlás dátuma</label>
      <div className="grid grid-cols-3">
        <div>
          <label>Nap</label>
          <select defaultValue={`${today.getUTCMonth() + 1}-${today.getUTCDate()}`}>
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
          <label>Óra</label>
          <select required defaultValue="">
            <option label=" " disabled></option>
            {Array(24).fill(0).map((_, i) => {
              return <option value="{i}" key={i}>{i.toString().padStart(2, '0')}</option>
            })}
          </select>
        </div>
        <div>
          <label>Perc</label>
          <select required defaultValue="">
            <option label=" " disabled></option>
            {Array(60).fill(0).map((_, i) => {
              return <option value="{i}" key={i}>{i.toString().padStart(2, '0')}</option>
            })}
          </select>
        </div>
      </div>
    </>
  );
}
