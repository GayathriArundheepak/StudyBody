interface Material {
    headline: string;
    url: string;
  }
  
  interface ICourseMaterial {
    note?: Material;
    video?: Material;
  }


  export default ICourseMaterial;