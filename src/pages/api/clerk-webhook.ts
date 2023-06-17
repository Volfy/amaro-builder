/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webhook } from 'svix';
import { buffer } from 'micro';
import { env } from "~/env.mjs";
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  }
}



const secret = env.CLERK_WEBHOOK_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    res.status(405).json({})
  }

  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(payload, headers as any);
  } catch (err) {
    res.status(400).json({ message: 'Bad signature'});
    return;
  }

  console.log(msg)
  
  res.json({})
}