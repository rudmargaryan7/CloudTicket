import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
type fieldType = {
  text: string;
  value: string;
};

type SelectGroupType = {
  fields: fieldType[];
  selectedField: string;
  onSelect: (type: string) => void;
};

const SelectGroup: FC<SelectGroupType> = ({
  fields,
  selectedField,
  onSelect,
}) => {
  return (
    <div className="flex gap-2">
      {fields.map((e: fieldType) => {
        return (
          <div
            key={uuidv4()}
            className={`py-3 cursor-pointer${
              selectedField === e.value
                ? " border-b-2 border-tertiary-color"
                : ""
            } text-xl text-tertiary-color`}
            onClick={() => onSelect(e.value)}
          >
            {e.text}
          </div>
        );
      })}
    </div>
  );
};

export default SelectGroup;
