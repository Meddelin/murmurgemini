/**
 * Роуты для работы с профилями питомцев
 * Определяют endpoints для CRUD операций над питомцами
 */

import { Router } from 'express';
import * as petController from '../controllers/pet.controller';

const router = Router();

/**
 * GET /api/pets/breeds - получить список пород (должен быть ДО /:id)
 */
router.get('/breeds', petController.getBreeds);

/**
 * GET /api/pets - получить питомцев текущего пользователя
 */
router.get('/', petController.getPets);

/**
 * GET /api/pets/:id - получить питомца по ID
 */
router.get('/:id', petController.getPetById);

/**
 * POST /api/pets - создать нового питомца
 */
router.post('/', petController.createPet);

/**
 * PUT /api/pets/:id - обновить информацию о питомце
 */
router.put('/:id', petController.updatePet);

/**
 * DELETE /api/pets/:id - удалить питомца
 */
router.delete('/:id', petController.deletePet);

export default router;


