import mongoose from 'mongoose';
import { OrganizationModel } from './organization.js';
import { ProjectModel } from './project.js';
import {
  create,
  getById,
  update,
  remove,
  listAll
} from './services/projectService.js';

async function runDemo() {
  try {
    await mongoose.connect(
      'mongodb+srv://alba:alba@cluster0.gmw5k8g.mongodb.net/ea_mongoose?retryWrites=true&w=majority'
    );
    console.log('🚀 Connected to MongoDB');

    console.log('🧹 Cleaning database...');
    await ProjectModel.deleteMany({});
    await OrganizationModel.deleteMany({});

    console.log('🌱 Seeding data...');

    const orgs = await OrganizationModel.insertMany([
      { name: 'Initech', country: 'USA' },
      { name: 'Umbrella Corp', country: 'UK' }
    ]);

    const initechId = orgs[0]._id;

    console.log('\n🔧 PROJECT CRUD DEMO:');

    const createdProject = await create({
      name: 'API REST',
      description: 'Proyecto para exponer servicios con Express',
      organization: initechId
    });

    console.log('✅ Created project:');
    console.log(createdProject);

    const projectById = await getById(createdProject._id.toString());
    console.log('\n🔍 getById + populate:');
    console.log(projectById);

    const updatedProject = await update(createdProject._id.toString(), {
      description: 'Proyecto actualizado para Express + TypeScript'
    });
    console.log('\n✏️ Updated project:');
    console.log(updatedProject);

    const allProjects = await listAll();
    console.log('\n📋 listAll:');
    console.log(allProjects);

    const deletedProject = await remove(createdProject._id.toString());
    console.log('\n🗑️ Deleted project:');
    console.log(deletedProject);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected');
  }
}

runDemo();