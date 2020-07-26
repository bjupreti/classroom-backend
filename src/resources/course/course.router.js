import { Router } from 'express';
import controllers from './course.controller';

const router = Router();

// api/course
router.route('/').get(controllers.getMany).post(controllers.createOne);

// api/course/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
