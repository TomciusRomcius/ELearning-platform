import { CourseType } from "@/utils/types";
import axios from "axios";

export async function loadCourse(id: string): Promise<CourseType> {
  try {
    let req = await axios.get(`/api/courses/${id}`);
    return req.data;
  }
  catch(err) {
    console.log(err);
  }
}