"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use("/api/serviceProvider/", routes_1.serviceProviderRouter);
app.use("/api/user/", routes_1.userRouter);
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
