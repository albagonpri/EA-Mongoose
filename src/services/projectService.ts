import { ProjectModel, IProject } from '../project.js';

export async function create(data: Partial<IProject>) {
  return await ProjectModel.create(data);
}

export async function getById(id: string) {
  return await ProjectModel.findById(id).populate('organization');
}

export async function update(id: string, data: Partial<IProject>) {
  return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
}

export async function remove(id: string) {
  return await ProjectModel.findByIdAndDelete(id);
}

export async function listAll() {
  return await ProjectModel.find().lean();
}