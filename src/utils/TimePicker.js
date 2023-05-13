// here we are designing  a normal time picker;

import React, {useState} from 'react';
import TimeInput from 'react-time-picker-input';

const TimeInputEx = () => {
  const [dateEx3, setDateEx3] = useState('10:12');

  return (
    <TimeInput
      value={dateEx3}
      hour12FormateachInputDropdownmanuallyDisplayDropdownonChange={dateString =>
        setDateEx3(dateString)
      }
    />
  );
};

export default TimeInputEx;
