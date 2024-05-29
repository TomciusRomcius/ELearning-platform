import { ModuleType } from "@/app/courses/[...id]/utils/types";
import axios from "axios";

export async function createModule(courseId: string, module: ModuleType) {
  let req = await axios.post(`/api/courses/${courseId}/modules`, {
    module: module,
  });

  return req;
}

export async function deleteModule(courseId: string, moduleId: string) {
  await axios.delete(`/api/courses/${courseId}/modules/${moduleId}`);
}