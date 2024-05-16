
import mongoose, { Schema} from 'mongoose';
import { ICourse } from '../interface/course';


  
const SlotSchema = new Schema({
  day: { type: [String], required: true },
  time: { type: String, required: true },
  isWeekend: { type: Boolean, required: true }
});


const MaterialSchema: Schema = new Schema({
  note: {
    headline: { type: String, required: true },
    url: { type: String, required: true }
  },
  video: {
    headline: { type: String, required: true },
    url: { type: String, required: true }
  },
});


  const SubjectSchema = new Schema({
    name:[ { type: String, required: true }], // Name of the subject
    // You can add more fields here like teacher, syllabus, etc.
  });
  
  // Define the schema for a class/standard
  // const ClassSchema = new Schema({
  //   name: { type: String, required: true }, // Name of the class/standard
  //   subjects: SubjectSchema // Subjects associated with this class
  // });

  
  const CourseSchema: Schema = new Schema({
    syllabus: { type: String, required: true },
    standard: { type: String, required: true },
    subject: { type: String, required: true },
    teacher_id: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher'  },
    course_title: { type: String, required: true, unique: true },
    expairy: { type: String },
    description: { type: String, required: true },
    attendance: [Schema.Types.Mixed],
    materials:[MaterialSchema],
    students_list: [{ type: Schema.Types.ObjectId ,ref: 'Student' }],
    commission: { type: Number },
    prize: { type: Number, required: true },
    slot: SlotSchema,
    promotion_video: { type: String },
    isAvailable:
    {type: Boolean,
       default:true  },
  block: { 
    type: Boolean,
     required: true,
     default:false,
   },
   review: [{
    comment:{type:String},
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'Student'  }
   }
  ],
   rating: 
   { type:Number
    },
    adminApproved: {
      type: Boolean, 
      required: true, 
      default: false,
     }, 
     community: { type: Schema.Types.ObjectId, ref: 'Conversation' }
  
},  { timestamps: true });

  const Course = mongoose.model<ICourse>('Course', CourseSchema);
  
  export default Course;