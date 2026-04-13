import {Router} from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller';

const router: Router = Router();

router.post('/create', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/', getCategories);

export default router;