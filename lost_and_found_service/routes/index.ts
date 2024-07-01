import express from 'express';
import userRoutes from './userRoutes'
import reportRoutes from './reportRoutes'
import claimRoutes from './claimRoutes'
import contactRoutes from './contactRoutes'

const router = express.Router();
router.use(userRoutes)
router.use(reportRoutes)
router.use(claimRoutes)
router.use(contactRoutes)


export default router