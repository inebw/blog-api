const LocalStrategy = require("passport-local").Strategy;
const { prisma } = require("../lib/prisma");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) return done(null, false, { message: "User not found!" });
    if (await bcrypt.compare(password, user.password)) {
      done(null, user);
    } else {
      done(null, false, { message: "Wrong password entered!" });
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
