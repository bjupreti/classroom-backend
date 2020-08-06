import { Course } from './course.model';
import { crudControllers } from '../../utils/crud';
import { courseValidation } from '../../utils/validation';

const catchError = (e, res) => {
  console.error(e);
  res.status(400).send(e);
};

const getOne = async (req, res) => {
  try {
    const doc = await Course.findById(req.params.id)
      .populate('files')
      .lean()
      .exec();
    if (!doc) {
      return res.status(404).send({ message: 'Course not found.' });
    }
    res.status(200).json({ data: doc });
  } catch (e) {
    catchError(e, res);
  }
};

const getMany = async (req, res) => {
  try {
    const docs = await Course.find({ createdBy: req.user._id })
      .select('-files')
      .lean()
      .exec();
    res.status(200).json({ data: docs });
  } catch (e) {
    catchError(e, res);
  }
};

const uploadFile = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findOne({
      createdBy: req.user._id,
      _id: courseId
    });
    if (!course) return res.status(404).send({ message: 'Course not found.' });
    req.files.map((file) => {
      const {
        originalname: originalName,
        mimetype: mimeType,
        filename: fileName,
        size
      } = file;

      course.files.push({
        originalName,
        mimeType,
        fileName,
        size,
        path: `/uploads/${fileName}`
      });
    });
    course.save(function (err) {
      if (!err) {
        return res.status(200).send({ data: course });
      }
      res.status(400).send(err);
    });
  } catch (e) {
    catchError(e, res);
  }
};

const removeFile = async (req, res) => {
  try {
    const course = await Course.findOne({
      createdBy: req.user._id,
      _id: req.params.courseId
    });
    if (!course) return res.status(404).send({ message: 'Course not found.' });
    course.files.pull(req.params.id);
    course.save(function (err) {
      if (!err) {
        return res.status(200).json({ data: course });
      }
      res.status(400).send(err);
    });
  } catch (e) {
    catchError(e, res);
  }
};

const downloadFile = async (req, res) => {
  const { id, courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send({ message: 'Course not found.' });

    const file = await course.files.id(id);
    if (!file) return res.status(404).send({ message: 'File not found.' });

    res.download(`public${file.path}`);
  } catch (e) {
    catchError(e, res);
  }
};

export default {
  ...crudControllers(Course, courseValidation),
  getOne,
  getMany,
  uploadFile,
  removeFile,
  downloadFile
};
