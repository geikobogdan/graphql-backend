export const PORT = 4000;
export const USER_SECRET = "USER_SECRET";

export const sessionOptions = {
  key: "token",
  secret: USER_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: true,
    sameSite: "none",
  },
};

export const corsOptions = {
  // origin: `http://localhost:4000`,
  // credentials: true,
  credentials: true,
  origin: new RegExp("/*/"),
};
