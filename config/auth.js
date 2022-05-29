module.exports = {
    secret: process.env.AUTH_SECRET || "Charata!",
    expires: process.env.AUTH_EXPIRES || "4h",
    rounds: process.env.AUTH_ROUNDS || 10
}