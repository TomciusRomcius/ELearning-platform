import axios from "axios";

export async function createCourse(name: string, description: string, category: string, imageFile: File) {
  const formData = new FormData();
  formData.append("course", JSON.stringify({ title: name, description, category }));
  formData.append("file", imageFile);

  await axios.post("/api/courses", formData);
}