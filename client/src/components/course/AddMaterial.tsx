import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../axios/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserSliceState } from '../../redux/user/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoUpload from '../videoUpload/VideoUpload';
import NoteUpload from '../NoteUpload/NoteUpload';
import { useNavigate } from 'react-router-dom';

const AddMaterials = () => {
  const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
  const teacherId = currentUser?._id;
  const navigate = useNavigate();
  const courseId = '660a92fc8cf6960fd8f355bd'; // Example courseId
  console.log(courseId)
  const [note, setNote] = useState('');
  const [video, setVideo] = useState('');

  const handleVideoUrlChange = (newVideoUrl: string) => {
    setVideo(newVideoUrl);
  };

  const handleNoteUrlChange = (newNoteUrl: string) => {
    setNote(newNoteUrl);
  };
  const handleBack = () => {
    // Use navigate with -1 to go back to the previous page
    navigate(-1);
  };
  return (
    <div className="form">
       <button onClick={handleBack}>back</button>
      <Formik
        initialValues={{
          materials: {
            note: { headline: '', url: '' },
            video: { headline: '', url: '' }
          },
        }}
        validationSchema={Yup.object().shape({
          materials: Yup.object().shape({
            note: Yup.object().shape({
              headline: Yup.string().required('Note headline is required'),
              //  url: Yup.string().required('Note URL is required')
            }),
            video: Yup.object().shape({
              headline: Yup.string().required('Video headline is required'),
              //  url: Yup.string().required('Video URL is required')
            })
          })
        })}
        onSubmit={(values, { setSubmitting, setFieldValue }) => {
          console.log('values:',values)
          // Set the 'url' values for 'note' and 'video' before submission
          setFieldValue('materials.note.url', note);
          setFieldValue('materials.video.url', video);
        
          // Log the values for debugging
          
        
          // If both video and note urls are empty, return without submitting
          if (!video && !note) {
            setSubmitting(false);
            return;
          }
          values = { 
            ...values, 
            materials: { 
              ...values.materials, 
              note: { ...values.materials.note, url: note }, 
              video: { ...values.materials.video, url: video } 
            } 
          };
          console.log('Submitting form with values:', values);
          // Perform form submission
          api
            .post(`/api/course/add-materials/${courseId}/${teacherId}`, { materials: values.materials })
            .then((response) => {
              console.log('Materials added successfully:', response.data);
              toast.success(response.data.message);
            })
            .catch((error) => {
              console.error('Error adding materials:', error);
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

            <div className="materials">
              <h1>Materials</h1>
              <div>
                <label htmlFor="note.headline">Note Headline</label>
                <Field type="text" id="note.headline" name="materials.note.headline" className="input-field" />
                <ErrorMessage name="materials.note.headline" className="error-message" component="div" />
             
              </div>
              <div>
                <label htmlFor="note.url">Note URL</label>
               
                      <NoteUpload onNoteUrlChange={handleNoteUrlChange} />
                <ErrorMessage name="materials.note.url" className="error-message" component="div" />
              </div>
              <div>
                <label htmlFor="video.headline">Video Headline</label>
                <Field type="text" id="video.headline" name="materials.video.headline" className="input-field" />
                <ErrorMessage name="materials.video.headline" className="error-message" component="div" />
                
              </div>
              <div>
                <label htmlFor="video.url">Video URL</label>
                <VideoUpload onVideoUrlChange={handleVideoUrlChange} />
                {/* <Field type="text" id="video.url" name="materials.video.url" className="input-field" /> */}
                <ErrorMessage name="materials.video.url" className="error-message" component="div" />
              </div>
            </div>
            <button type="submit" disabled={formik.isSubmitting} className="button btnSubmit">
              Add Materials
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
 }

export default AddMaterials;

