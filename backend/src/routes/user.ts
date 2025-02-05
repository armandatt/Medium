import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import {decode , sign , verify} from 'hono/jwt';
import { signupInput ,signinInput } from '../../../common/src/index';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    }>();

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
        select :{
          id:true,
          domainId:true
        }
      })
  
      if (!user) {
        c.status(403);
        return c.json({ error: 'User not found' })
      }
  
      const token = await sign({ id: user.id , domainId: user.domainId}, c.env.JWT_SECRET)
      return c.json({
        jwt: token,
        domainId: user.domainId
      })
  
    } catch (error) {
      console.error(error)
      return c.text("Error finding user")
    }
  
  })
  
  
  userRouter.post('/signup', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
          domainId: body.domainId
        }
      })
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({
        jwt: token
      })
  
  
    } catch (error) {
      console.error(error)
      return c.text("Error creating user")
    }
  })
  