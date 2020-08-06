import { Router } from 'express';
import controllers from './course.controller';
import upload from '../../utils/upload';

const router = Router();

// api/course
router.route('/').get(controllers.getMany).post(controllers.createOne);

// api/course/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

// api/course/:courseId/file/
router.post('/:courseId/file/', upload, controllers.uploadFile);

// api/course/:courseId/file/:id
router.delete('/:courseId/file/:id', controllers.removeFile);

export default router;
