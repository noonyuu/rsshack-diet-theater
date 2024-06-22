import { useState } from "react";
import { useDateSelect } from "react-ymd-date-select";

interface CustomDateSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export const CustomDateSelect: React.FC<CustomDateSelectProps> = (props) => {
  const dateSelect = useDateSelect(props.value, props.onChange);

  return (
    <>
      <div className="pt-12 md:pt-18 mx-10 md:mx-20">
        <label className="text-lg border-2 p-1 mr-2 rounded-md">
          <select value={dateSelect.yearValue} onChange={dateSelect.onYearChange}>
            {dateSelect.yearOptions.map((yearOption) => (
              <option key={yearOption.value} value={yearOption.value}>
                {yearOption.label}年
              </option>
            ))}
          </select>
        </label>
        <label className="text-lg border-2 p-1 rounded-md">
          <select
            value={dateSelect.monthValue}
            onChange={dateSelect.onMonthChange}
          >
            {dateSelect.monthOptions.map((monthOption) => (
              <option key={monthOption.value} value={monthOption.value}>
                {monthOption.label}月
              </option>
            ))}
          </select>
        </label>
      </div>
      
    </>
  );
}

export default CustomDateSelect;
