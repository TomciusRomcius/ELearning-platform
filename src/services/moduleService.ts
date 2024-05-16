import axios from "axios";

export async function createModule(courseId: string, moduleName: string) {
  await axios.post(`/api/courses/${courseId}/modules`, {
    moduleName: moduleName,
  });
}

export async function deleteModule(courseId: string, moduleId: string) {
  await axios.delete(`/api/courses/${courseId}/modules/${moduleId}`);
}