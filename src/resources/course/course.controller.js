import { Course } from './course.model';
import { crudControllers } from '../../utils/crud';
import { courseValidation } from '../../utils/validation';

export default crudControllers(Course, courseValidation);
