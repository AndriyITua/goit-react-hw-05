import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (value, actions) => {
    value.search === ""
      ? toast("Введіть назву фільму")
      : onSearch(value.search);
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field
          autoComplete="off"
          autoFocus
          type="text"
          name="search"
          placeholder="Search"
        />
        <button type="submit">Search</button>
        <div>
          <Toaster />
        </div>
      </Form>
    </Formik>
  );
}
