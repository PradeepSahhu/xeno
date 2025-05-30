// import type { Field, RuleType } from 'react-querybuilder';
import { defaultOperators, toFullOption } from "react-querybuilder";

export const validator = (r) => !!r.value;

// export const fields = [
//   {
//     name: "firstName",
//     label: "First Name",
//     placeholder: "Enter first name",
//     validator,
//   },
//   {
//     name: "lastName",
//     label: "Last Name",
//     placeholder: "Enter last name",
//     defaultOperator: "beginsWith",
//     validator,
//   },
//   { name: "age", label: "Age", inputType: "number", validator },
//   {
//     name: "isMusician",
//     label: "Is a musician",
//     valueEditorType: "checkbox",
//     operators: defaultOperators.filter((op) => op.name === "="),
//     defaultValue: false,
//   },
//   {
//     name: "instrument",
//     label: "Primary instrument",
//     valueEditorType: "select",
//     values: musicalInstruments,
//     // This must be commented out to properly demonstrate `autoSelectValue={false}`
//     // defaultValue: 'Cowbell',
//     operators: defaultOperators.filter((op) => op.name === "="),
//   },
//   {
//     name: "alsoPlays",
//     label: "Also plays",
//     valueEditorType: "multiselect",
//     values: musicalInstruments,
//     defaultValue: "More cowbell",
//     operators: defaultOperators.filter((op) => op.name === "in"),
//   },
//   {
//     name: "gender",
//     label: "Gender",
//     operators: defaultOperators.filter((op) => op.name === "="),
//     valueEditorType: "radio",
//     values: [
//       { name: "M", label: "Male" },
//       { name: "F", label: "Female" },
//       { name: "O", label: "Other" },
//     ],
//   },
//   { name: "height", label: "Height", validator },
//   { name: "job", label: "Job", validator },
//   { name: "description", label: "Description", valueEditorType: "textarea" },
//   {
//     name: "birthdate",
//     label: "Birth Date",
//     inputType: "date",
//     datatype: "date",
//   },
//   {
//     name: "datetime",
//     label: "Show Time",
//     inputType: "datetime-local",
//     datatype: "timestamp with time zone",
//   },
//   { name: "alarm", label: "Daily Alarm", inputType: "time" },
//   {
//     name: "groupedField1",
//     label: "Grouped Field 1",
//     comparator: "groupNumber",
//     groupNumber: "group1",
//     valueSources: ["field", "value"],
//   },
//   {
//     name: "groupedField2",
//     label: "Grouped Field 2",
//     comparator: "groupNumber",
//     groupNumber: "group1",
//     valueSources: ["field", "value"],
//   },
//   {
//     name: "groupedField3",
//     label: "Grouped Field 3",
//     comparator: "groupNumber",
//     groupNumber: "group1",
//     valueSources: ["field", "value"],
//   },
//   {
//     name: "groupedField4",
//     label: "Grouped Field 4",
//     comparator: "groupNumber",
//     groupNumber: "group1",
//     valueSources: ["field", "value"],
//   },
// ].map((o) => toFullOption(o));
export const fields = [
  {
    name: "customerName",
    label: "Customer Name",
    placeholder: "Enter name",
    defaultOperator: "beginsWith",
    validator,
  },
  {
    name: "customerEmail",
    label: "Customer Email",
    placeholder: "Enter Email Address",
    defaultOperator: "beginsWith",
    validator,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    inputType: "number",
    validator,
  },
  { name: "totalSpent", label: "Total Spend", inputType: "number", validator },
  {
    name: "totalVisits",
    label: "Total Visits",
    inputType: "number",
    validator,
  },
  {
    name: "inactive",
    label: "Inactive",
    inputType: "date",
    datatype: "date",
  },
  {
    name: "lastPurchased",
    label: "Last Purchased",
    defaultOperator: "<=",
    inputType: "date",
    datatype: "date",
  },
  {
    name: "createdAt",
    label: "Created",
    defaultOperator: "<",
    inputType: "date",
    datatype: "date",
  },
  {
    name: "isActive",
    label: "Active",
    defaultOperator: "=",
    placeholder: "Yes/No",
    datatype: "date",
    validator,
  },
].map((o) => toFullOption(o));
