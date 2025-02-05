import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userID: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const header = await c.req.header('authorization') || "";
    const user = await verify(header, c.env.JWT_SECRET);
    if (user) {
        // @ts-ignore
        c.set("userID", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }

})


blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authorId = c.get("userID");
    const body = await c.req.json();
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
            domainId: body.domainId
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

// blogRouter.get('/bulk', async(c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const body = await c.req.json();
//     const blog = await prisma.post.findMany({
//         where: {domainId: body.domainId},
//         select: {
//             id: true,
//             title: true,
//             content: true,
//             author:{
//                 select:{
//                     name: true
//                 }
//             }
//         }
//     });
//     return c.json({
//         blog: blog
//     })
// })


blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const domainId = c.req.param("id");
    console.log(domainId)
    const blog = await prisma.post.findMany({
        where: {
            domainId: Number(domainId)
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            },
            domainId: true,
        }
    })
    return c.json({
        blog: blog
    })
})

blogRouter.get('/fullBlog/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id");
    console.log(id)
    const blog = await prisma.post.findFirst({
        where: {
            id : Number(id)
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            },
            domainId: true,
        }
    })
    return c.json({
        blog: blog
    })
})


