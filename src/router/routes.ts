import express, { Request, Response } from 'express';
import { authRouter } from './routes/auth.router';
import { adminRouter } from './routes/admin.router';
import { customerRouter } from './routes/customer.router';
import { validatorForCookieToken } from '../validators/validatorForCookieToken';
import { siteRouter } from './routes/site.router';
import { meterRouter } from './routes/meter.router';
import { circuitRouter } from './routes/circuit.router';
import { clientRouter } from './routes/client.router';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(
    `${process.env.npm_package_name}@@@${process.env.npm_package_version}`,
  );
});

router.use('/auth', authRouter);
router.use('/client', clientRouter);
router.use('/admin', validatorForCookieToken, adminRouter);
router.use('/customer', validatorForCookieToken, customerRouter);
router.use('/site', validatorForCookieToken, siteRouter);
router.use('/meter', validatorForCookieToken, meterRouter);
router.use('/circuit', validatorForCookieToken, circuitRouter);
