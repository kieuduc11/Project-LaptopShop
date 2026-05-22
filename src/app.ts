/// <reference path="./types/index.d.ts" />

import express from "express";
import "dotenv/config";
import path from "path";

import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";

import { prisma } from "config/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const app = express();
const PORT = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === "production";

// config view engine
app.set("view engine", "ejs");

app.set(
  "views",
  isProduction
    ? path.join(__dirname, "views")
    : path.join(__dirname, "../src/views")
);

// config static files
app.use(
  express.static(
    isProduction
      ? path.join(__dirname, "public")
      : path.join(__dirname, "../public")
  )
);

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 1 * 24 * 60 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined
    })
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.session());

configPassportLocal();

// config global
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// config routes
webRoutes(app);

// seeding data
initDatabase();

// handle 404 not found
app.use((req, res) => {
  res.render("status/404");
});

app.listen(PORT, () => {
  console.log(`This app is running on port: ${PORT}`);
});