export const doctors_page = {
  collection: "doctors",
  name: "Doctors",
  singularName: "Doctor",
  filterItems: [
    { label: "Name", value: "label" },
    { label: "Area", value: "area" },
    { label: "Visits", value: "visits" },
  ],
  displayKeys: [
    ["name", "Name"],
    ["address", "Address"],
    ["phone_number", "Phone Number"],
    ["specialty", "Specialty"],
    ["qualification", "Qualification"],
    ["practitioner_id", "Practitioner ID"],
    ["verified", "Verified"],
  ],
};
export const reps_page = {
  collection: "sales-reps",
  name: "Sales Reps",
  singularName: "Sales Rep",
  filterItems: [
    { label: "Name", value: "label" },
    { label: "Area", value: "area" },
    { label: "Visits", value: "visits" },
  ],
  displayKeys: [
    ["name", "Name"],
    ["address", "Address"],
    ["phone_number", "Phone Number"],
  ],
};
export const visits_page = {
  collection: "visits",
  singularName: "Visit",
  name: "Visits",
  filterItems: [{ label: "Name", value: "label" }],
  displayKeys: [],
};
