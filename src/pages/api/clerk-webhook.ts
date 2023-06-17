/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webhook } from 'svix';
import { buffer } from 'micro';
import { env } from "~/env.mjs";
import type { NextApiRequest, NextApiResponse } from 'next';
import Neode from 'neode'
import UserSchema from '../../server/models/User'

export const config = {
  api: {
    bodyParser: false,
  }
}

interface UserObjectData {
  id: string,
}

interface UserCreated {
  data: UserObjectData,
  object: string,
  type: string,
}

const secret = env.CLERK_WEBHOOK_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    res.status(405).json({})
  }

  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(secret);
  let msg: UserCreated;
  try {
    msg = wh.verify(payload, headers as any) as UserCreated;
  } catch (err) {
    res.status(400).json({ message: 'Bad signature'});
    return;
  }

  const instance = Neode.fromEnv()
    .with({
      User: UserSchema
  })
      
  await instance.create('User', {
      clerkId: msg.data.id,
      active: true,
  })
  
  res.json({})
}