"use strict";
// export class usersController {
//     async createUser(req: Request, res: Response) {
//         try {
//             let data: Prisma.UserCreateInput = req.body as Prisma.UserCreateInput;
//             if (!data.name || !data.email || !data.password) {
//                 res.status(400).json({ error: "Name, email, and password are required." });
//                 return;
//             }
//             data.password = await hashPassword(data.password);
//             const user: User = await CreateUser(data);
//             res.status(201).json(user);
//         } catch (error) {
//             console.error("Error creating user:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
//     async login(req: Request, res: Response) {
//         try {
//             const { email, password } = req.body;
//             if (!email || !password) {
//                 res.status(400).json({ error: "Email and password are required." });
//                 return;
//             }
//             const user: User | null = await login(email, password);
//             if (!user) {
//                 throw new Error("Invalid email or password");
//             }
//             res.status(200).json({ user });
//         } catch (error) {
//             console.log("Invalid email or password", error);
//             res.status(401).json({ error: "Invalid email or password" });
//         }
//     }
// }
