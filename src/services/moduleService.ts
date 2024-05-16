import axios from "axios";

export async function createModule(courseId: string, moduleName: string) {
  await axios.post(`/api/courses/${courseId}/modules`, {
    moduleName: moduleName,
  });
}