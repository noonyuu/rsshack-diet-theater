import { useState } from "react";
import { useDateSelect } from "react-ymd-date-select";

interface CustomDateSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export const CustomDateSelect = (props: CustomDateSelectProps) => {
  const dateSelect = useDateSelect(props.value, props.onChange);

  return (
    <>
      <label>
        Year
        <select value={dateSelect.yearValue} onChange={dateSelect.onYearChange}>
          {dateSelect.yearOptions.map((yearOption) => (
            <option key={yearOption.value} value={yearOption.value}>
              {yearOption.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Month
        <select
          value={dateSelect.monthValue}
          onChange={dateSelect.onMonthChange}
        >
          {dateSelect.monthOptions.map((monthOption) => (
            <option key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}


// import { ChakraProvider } from "@chakra-ui/react";
// import { DateSelect } from "react-ymd-date-select/presets/chakra-ui";

// function Sample() {
//   const [date, setDate] = useState("");

//   return (
//     <ChakraProvider>
//       <DateSelect value={date} onChange={setDate} />
//       <p>Selected date is: {date}</p>
//     </ChakraProvider>
//   );
// }

// export default Sample;
