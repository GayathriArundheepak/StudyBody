import React from "react";
import "./AddSubject.scss";
import api from "../../../../axios/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/navbar/Navbar";

interface AddSubjectProps {}

const AddSubject: React.FC<AddSubjectProps> = () => {
  const navigate = useNavigate(); // Get the history object
  const initialValues = {
    selectedSyllabus: "ICSE",
    selectedStandard: "1",
    subject: "",
  };

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    const formattedValues = {
      syllabus: values.selectedSyllabus,
      standard: values.selectedStandard,
      subject: values.subject,
    };

    try {
      const schema = Yup.object().shape({
        selectedSyllabus: Yup.string().required("Syllabus is required"),
        selectedStandard: Yup.string().required("Standard is required"),
        subject: Yup.string().required("Subject is required"),
      });

      await schema.validate(values, { abortEarly: false });
      api
        .post("/api/course/add-subjects", formattedValues)
        .then((response) => {
          console.log("Subject added successfully", response.data);
          // Clear input fields after successful submission
          resetForm();
          toast.success("Subject added successfully");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error("Error adding subject:", error.response.data.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } catch (error) {
      toast.error(`${error}`);
      console.error("Error adding subject:", error);
    }
    setSubmitting(false);
  };
  const handleBack = () => {
    // Use navigate with -1 to go back to the previous page
    navigate(-1);
  };

  return (
    <div className="add-subject">
      <Navbar />
      <div className="add-subject-container">
        {/* <button onClick={handleBack}>back</button> */}
        <ToastContainer />
        <h2>Add Subject</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(
            { isSubmitting, errors } // Pass errors object provided by Formik
          ) => (
            <Form>
              <div className="selection-container">
                <label htmlFor="selectedSyllabus">Syllabus:</label>
                <Field
                  as="select"
                  id="selectedSyllabus"
                  name="selectedSyllabus"
                >
                  <option value="ICSE">ICSE</option>
                  <option value="CBSE">CBSE</option>
                  <option value="STATE">STATE</option>
                </Field>
                <ErrorMessage
                  name="selectedSyllabus"
                  component="div"
                  className="error"
                />

                <label htmlFor="selectedStandard">Standard:</label>
                <Field
                  as="select"
                  id="selectedStandard"
                  name="selectedStandard"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="selectedStandard"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-group">
                <label htmlFor="subject">Subject:</label>
                <Field type="text" id="subject" name="subject" />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="error"
                />
              </div>

              <button add-subject-btn type="submit" disabled={isSubmitting}>
                Add Subject
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default AddSubject;
