import { passport } from "passport-local"
import LocalStrategy from "./strategies/local.strategy.js"

passport.use(LocalStrategy);