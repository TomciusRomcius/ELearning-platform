import axios from "axios";

export async function getCourses() {
  let courses = (await axios.get("/api/courses")).data;
  return courses;
}
