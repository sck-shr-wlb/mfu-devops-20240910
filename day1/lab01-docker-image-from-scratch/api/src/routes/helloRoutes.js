import { Router } from 'express';

const hello = (req, res) => {
  res.json({ message: 'Hello' });
};

const router = Router();

router.get('/hello', hello);

export default router;
