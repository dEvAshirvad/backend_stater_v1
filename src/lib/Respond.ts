import { Response } from 'express';
import { format } from 'date-fns';

export default function Respond(res: Response, data = {}, status: number) {
  const timestamp = new Date();

  if (!(status === 200 || status === 201)) {
    res.status(status).json({
      ...data,
    });
  }

  return res.status(status).json({
    ...data,
    success: true,
    status,
    timestamp: format(timestamp, 'PPP p'),
  });
}
