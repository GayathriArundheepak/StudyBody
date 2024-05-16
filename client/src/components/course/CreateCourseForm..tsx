import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserSliceState } from "../../redux/user/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateCourseForm.scss";
import VideoUpload from "../videoUpload/VideoUpload";
import api from "../../axios/api";

const days = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday", disabled: true },
];

const CreateCourseForm: React.FC = () => {
  const { currentUser }: UserSliceState = useSelector(
    (state: RootState) => state.user
  );
  const [selectedDays, setSelectedDays] = useState([]);
  const id = currentUser?._id;
  const [videoUrl, setVideoUrl] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const handleVideoUpload = (newVideoUrl: string) => {
    setVideoUrl(newVideoUrl); // Update local state with video URL
    // You can set other form values related to the video upload here if needed
  };

  const handleChangeStandard = (
    selectedStandard: string,
    setFieldValue: Function,
    { values }: FormikProps<any>
  ) => {
    // Check if both syllabus and standard are selected
    if (values.syllabus && selectedStandard) {
      api
        .get(`/api/course/subjects/${values.syllabus}/${selectedStandard}`)
        .then((response) => {
          console.log(response.data);
          setSubjects(response.data.subjects);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.error("Error fetching subjects:", error);
        })
        .finally(() => {
          setFieldValue("standard", selectedStandard);
        });
    } else {
      // If either syllabus or standard is not selected, do not make the API call
      setSubjects([]);
      toast.error("Please select both syllabus and standard");
    }
  };

  return (
    <div className="form">
      <Formik
        initialValues={{
          course_title: "",
          syllabus: "",
          subject: "",
          standard: "",
          expiry: "",
          slot: {
            day: [],
            time: "",
            isWeekend: true,
          },
          prize: "",
          commission: "",
          promotion_video: "",
          description: "",
        }}
        validationSchema={Yup.object({
          syllabus: Yup.string().required("Syllabus is required"),
          standard: Yup.string().required("Standard is required"),
          subject: Yup.string().required("Subject is required"),
          course_title: Yup.string().required("Course Title is required"),
          expiry: Yup.date()
            .min(new Date(), "Expiry date cannot be in the past")
            .required("Expiry date is required"),
          prize: Yup.number().required("Prize is required"),
          commission: Yup.number().required("Commission is required"),
          slot: Yup.object().shape({
            day: Yup.array()
              .min(1, "At least one day must be selected")
              .required("Days are required"),
            time: Yup.string()
              .test(
                "time-period",
                "Invalid time (only One hour need).",
                (value) => {
                  if (!value) return false;
                  const [start, end] = value.split(" - ");
                  const startTimeParts = start.match(
                    /(\d+):(\d+) ([APap][mM])/
                  );
                  const endTimeParts = end.match(/(\d+):(\d+) ([APap][mM])/);
                  if (!startTimeParts || !endTimeParts) return false;

                  let startHour = parseInt(startTimeParts[1]);
                  let endHour = parseInt(endTimeParts[1]);
                  const startAmPm = startTimeParts[3].toLowerCase();
                  const endAmPm = endTimeParts[3].toLowerCase();

                  if (endHour === 12 && endAmPm === "am") endHour = 0;
                  if (startHour === 12 && startAmPm === "pm") startHour = 0;
                  if (endAmPm === "am" && startAmPm === "pm") endHour += 12;
                  if (startAmPm === "am" && endAmPm === "pm" && endHour === 12)
                    endHour = 24;
                  const difference = endHour - startHour;
                  return difference === 1 || difference === -23;
                }
              )
              .required("Time period is required"),
            isWeekend: Yup.boolean().required("Is weekend? is required"),
          }),
          description: Yup.string().required("Description is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          if (!videoUrl) {
            // If videoUrl is empty, set promotion_video field error and return
            setSubmitting(false);
            toast.error("Please upload a video for promotion");
            return;
          }

          // Set promotion_video field value
          values = { ...values, promotion_video: videoUrl };
          axios
            .post(
              `http://localhost:8080/api/course/create-course/${id}`,
              values
            )
            .then((response) => {
              console.log("Form submitted successfully:", response.data);
              toast.success(response.data.message);
            })
            .catch((error) => {
              console.error("Error submitting form:", error);
              toast.error(error.response.data.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form className="create-course-form form">
            <ToastContainer />
            <h2 className="form-title">Create Course</h2>
            <div className="title">
              <label htmlFor="course_title">Course Title</label>
              <Field
                type="text"
                name="course_title"
                placeholder="eg: CBSE-std09-physics-May-2024-(yourcode)"
                className="input-field"
              />
              <ErrorMessage
                name="course_title"
                className="error-message"
                component="div"
              />
            </div>
            <div className="basic-info">
              <div className="syllabus">
                <label htmlFor="syllabus">Syllabus</label>
                <Field as="select" name="syllabus" className="input-field">
                  <option value="">Select Syllabus</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="STATE">STATE</option>
                </Field>
                <ErrorMessage
                  name="syllabus"
                  className="error-message"
                  component="div"
                />
              </div>
              <div className="standard">
                <label htmlFor="standard">Standard</label>
                <Field
                  as="select"
                  name="standard"
                  className="input-field"
                  onChange={(e: { target: { value: string } }) =>
                    handleChangeStandard(
                      e.target.value,
                      formik.setFieldValue,
                      formik
                    )
                  }
                >
                  <option value="">Select Standard</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="standard"
                  className="error-message"
                  component="div"
                />
              </div>
              <div className="subject">
                <label htmlFor="subject">Subject</label>
                <Field as="select" name="subject" className="input-field">
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subject"
                  className="error-message"
                  component="div"
                />
              </div>
              <div className="expiry">
                <label htmlFor="expiry">Course expiry</label>
                <Field
                  type="date"
                  name="expiry"
                  placeholder="Mininum 12 months"
                  className="input-field"
                />
                <ErrorMessage
                  name="expiry"
                  className="error-message"
                  component="div"
                />
              </div>
            </div>
            <div className="slot">
              <div>
                <label htmlFor="slot.day">Days</label>
                <Select
                  options={days}
                  isMulti
                  onChange={(selectedOptions: any) => {
                    const selectedValues = selectedOptions.map(
                      (option: { value: any }) => option.value
                    );
                    formik.setFieldValue("slot.day", selectedValues);
                    setSelectedDays(selectedOptions); // Update local state
                  }}
                />
                <ErrorMessage
                  name="slot.day"
                  className="error-message"
                  component="div"
                />
              </div>
              <div>
                <label htmlFor="slot.time">Time</label>
                <Field
                  type="text"
                  id="time"
                  name="slot.time"
                  placeholder="1:00 PM - 2:00 PM"
                  className="input-field"
                />
                <ErrorMessage
                  name="slot.time"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label htmlFor="slot.isWeekend">Is weekend?</label>
                <Field
                  as="select"
                  name="slot.isWeekend"
                  id="isWeekend"
                  className="input-field"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Field>
                <ErrorMessage
                  name="slot.isWeekend"
                  className="error-message"
                  component="div"
                />
              </div>
            </div>
            <div className="finance">
              <label htmlFor="prize">Prize</label>
              <Field
                type="number"
                name="prize"
                placeholder="eg 2500 /-"
                className="input-field"
              />
              <ErrorMessage
                name="prize"
                className="error-message"
                component="div"
              />
              <label htmlFor="commission">Commission (%)</label>
              <Field
                type="number"
                name="commission"
                placeholder="eg. 20%"
                className="input-field"
              />
              <ErrorMessage
                name="commission"
                className="error-message"
                component="div"
              />
            </div>
            <div>
              <label htmlFor="promotion_video"></label>
              <VideoUpload onVideoUrlChange={handleVideoUpload} />
              <ErrorMessage
                name="promotion_video"
                className="error-message"
                component="div"
              />
            </div>
            <div className="discription">
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" className="input-field" />
              <ErrorMessage
                name="description"
                className="error-message"
                component="div"
              />
            </div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="button btnSubmit"
            >
              Create Course
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCourseForm;
