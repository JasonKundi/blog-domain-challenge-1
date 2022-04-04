const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: {
      username: "alicemart",
      email: "alieMart@yahoo.co.uk",
      profile: {
        create: {
          name: "Alice Martin",
          profilePic:
            "https://www.clipartkey.com/mpngs/m/80-809592_transparent-profile-clipart-user-vector-icon-png.png",
          biography: "I have a dog called Tony",
        },
      },
    },
  });
  const createdUser2 = await prisma.user.create({
    data: {
      username: "dingoDolla",
      email: "australian@hotmail.co.uk",
      profile: {
        create: {
          name: "Bob Martin",
          profilePic:
            "https://www.clipartkey.com/mpngs/m/80-809592_transparent-profile-clipart-user-vector-icon-png.png",
          biography: "I come from the land down under",
        },
      },
    },
  });

  const createdPost = await prisma.post.create({
    data: {
      title: "dingoDolla is such a fool",
      content:
        "I had to create this post to highlight how much of a terrible grime MC dingoDolla is",
      user: {
        connect: {
          id: createdUser.id,
        },
      },
    },
  });

  const createdPost2 = await prisma.post.create({
    data: {
      title: "Where was you at Lord of the Mics?",
      content:
        "Alice you silly sausage, you call me out on bebo but where you? Can't even show up to an emceee battle you chief",
      user: {
        connect: {
          id: createdUser2.id,
        },
      },
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      content: "U OK HUN?",
      user: {
        connect: {
          id: createdUser.id,
        },
        post: {
          connect: {
            id: createdPost2.id,
          },
        },
      },
    },
  });

  console.log(`users created`, createdUser);
  console.log(`users created`, createdUser2);
  console.log(`post 1 created`, createdPost);
  console.log(`post 2 created`, createdPost2);

  // Add your code here

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
