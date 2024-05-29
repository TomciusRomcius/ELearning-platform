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

// We must have an _id assotiated with the module!
export async function updateModule(courseId: string, module: ModuleType) {
  if (!module._id)
    throw new Error("Module doesn't containt an id!");
  axios.patch(`/api/courses/${courseId}/modules/${module._id}`, {
    module: {
      title: module.title,
    },
  })
}