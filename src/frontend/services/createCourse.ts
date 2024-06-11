import axios from "axios";

export async function createCourse(name: string, description: string, category: string) {
  await axios.post("/api/courses", {
    title: name,
    description: description,
    category: category,
  });
}