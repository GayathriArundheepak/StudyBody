import React from 'react';
import './CreateReviewForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from '../../axios/api';
import { UserSliceState } from '../../redux/user/UserSlice';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const CreateReviewForm: React.FC = () => {
    const courseId = '660a92fc8cf6960fd8f355bd'
    const { currentUser }: UserSliceState = useSelector((state: RootState) => state.user);
    const handleSubmit = async (values:any, actions: any) => {
        try {
            console.log(values)
            api.post(`/api/course/create-review/${courseId}`, {
                comment: values.comment,
                studentId: currentUser?._id,
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Review created successfully');
                } else {
                    throw new Error('Failed to create review');
                }
            })
            .catch(error => {
                console.error('Error creating review:', error);
                throw new Error('Failed to create review: ' + error.message);
            });
            
        } catch (error) {
            console.error('Error creating review:', error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ comment: ''}}
            onSubmit={handleSubmit}
            validate={(values) => {
                const errors: any = {};
                if (!values.comment) {
                    errors.comment = 'Comment is required';
                }
                return errors;
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="comment">Comment:</label>
                        <Field type="text" id="comment" name="comment" />
                        <ErrorMessage name="comment" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateReviewForm;
